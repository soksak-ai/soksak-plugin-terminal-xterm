SHELL := /bin/sh
.PHONY: preflight guard prepare build verify require-tooling require-out release attest
registry_flags = --@soksak:registry=$(REGISTRY) --@soksak-ai:registry=$(REGISTRY) --config.minimum-release-age=0
# REGISTRY is accepted from the make command line only ($(origin) must be "command line").
# GNU make's own environment channels (MAKEFLAGS, GNUMAKEFLAGS, MAKEFILES, -e) are outside this
# Makefile's control and are not refused; setting them is a deliberate act of the caller.
preflight:
	@scripts/check-build-environment.sh
# A package that depends on @soksak/* or @soksak-ai/* requires REGISTRY for every install, the public registry included.
guard:
	@case "$(origin REGISTRY)" in undefined|"command line") ;; *) echo 'REGISTRY from the $(origin REGISTRY) is refused: make verify REGISTRY=http://host:port/' >&2; exit 64 ;; esac
	@case "$(origin REGISTRY):$(REGISTRY)" in undefined:|"command line:http://"*|"command line:https://"*) ;; *) echo 'REGISTRY must be an absolute URL: make verify REGISTRY=http://host:port/' >&2; exit 64 ;; esac
	@dependency=$$(node -p 'const p=require("$(CURDIR)/frontend/package.json");Object.keys({...p.dependencies,...p.devDependencies,...p.peerDependencies}).find((name)=>/^@soksak(-ai)?\//.test(name))??""') || exit $$?; test -z "$$dependency" || test "$(origin REGISTRY)" = "command line" || { echo "REGISTRY required: this package depends on $$dependency: make verify REGISTRY=http://host:port/" >&2; exit 64; }
# A failed install exits with the pnpm status; the pnpm-workspace.yaml digest is compared only after a successful install.
prepare: guard preflight
	@before=$$(shasum -a 256 frontend/pnpm-workspace.yaml); CI=1 PNPM_DISABLE_SELF_UPDATE_CHECK=1 pnpm --dir frontend install --frozen-lockfile $(if $(findstring command line,$(origin REGISTRY)),$(registry_flags)) || exit $$?; test "$$before" = "$$(shasum -a 256 frontend/pnpm-workspace.yaml)" || { echo 'pnpm install rewrote frontend/pnpm-workspace.yaml' >&2; exit 65; }
# pnpm 11 compares the settings recorded by the install before every script run and reinstalls
# without the registry flags on any difference (CI toggles enableGlobalVirtualStore, the flags set
# minimumReleaseAge). The run commands repeat the install environment and flags; the flags precede
# the script name so pnpm consumes them instead of the script.
build: prepare
	@CI=1 PNPM_DISABLE_SELF_UPDATE_CHECK=1 pnpm --dir frontend $(if $(findstring command line,$(origin REGISTRY)),$(registry_flags)) build
verify: prepare
	@node scripts/check-release-workflow.mjs
	@CI=1 PNPM_DISABLE_SELF_UPDATE_CHECK=1 pnpm --dir frontend $(if $(findstring command line,$(origin REGISTRY)),$(registry_flags)) verify

require-tooling:
	@case "$(origin SDK_ROOT)" in "command line") ;; *) echo 'SDK_ROOT must be an absolute command-line path to an extracted soksak-sdk release' >&2; exit 64 ;; esac
	@case "$(origin SDK_RELEASE)" in "command line") ;; *) echo 'SDK_RELEASE must be an absolute command-line path to the exact SDK release.json' >&2; exit 64 ;; esac
	@case "$(SDK_ROOT):$(SDK_RELEASE)" in /*:/*) ;; *) echo 'SDK_ROOT and SDK_RELEASE must be absolute paths' >&2; exit 64 ;; esac
	@test -d "$(SDK_ROOT)" && test ! -L "$(SDK_ROOT)" && test -f "$(SDK_ROOT)/bin/soksak-sdk.mjs" || { echo 'SDK_ROOT is not an extracted regular SDK release' >&2; exit 66; }
	@test -f "$(SDK_RELEASE)" && test ! -L "$(SDK_RELEASE)" || { echo 'SDK_RELEASE is not a regular file' >&2; exit 66; }
	@test -f "$(SDK_ROOT)/.dependencies/soksak-spec/release-template/verify-plugin-release.mjs" || { echo 'SDK_ROOT has no prepared canonical Spec verifier' >&2; exit 66; }
	@test -z "$$(find "$(SDK_ROOT)" -type l -print -quit)" || { echo 'SDK_ROOT contains a symbolic link' >&2; exit 66; }

require-out:
	@case "$(origin OUT)" in "command line") ;; *) echo 'OUT must be an absolute command-line path to the complete release output' >&2; exit 64 ;; esac
	@case "$(OUT)" in /*) ;; *) echo 'OUT must be an absolute path' >&2; exit 64 ;; esac
	@test "$(OUT)" != "$(CURDIR)" || { echo 'OUT must not replace the source repository' >&2; exit 64; }

release: require-tooling require-out
	@test -z "$$(git status --porcelain)" || { echo 'release source checkout must be clean' >&2; exit 65; }
	@node "$(SDK_ROOT)/.dependencies/soksak-spec/release-template/verify-plugin-release.mjs" \
		--commit "$$(git rev-parse --verify HEAD)" --out "$(OUT)" \
		$(if $(findstring command line,$(origin REGISTRY)),--registry "$(REGISTRY)")

attest: require-tooling require-out release
	@platform="$$(node -p 'process.platform')"; architecture="$$(node -p 'process.arch')"; \
		node_version="$$(node -p 'process.versions.node')"; pnpm_version="$$(pnpm --version)"; \
		node "$(SDK_ROOT)/bin/soksak-sdk.mjs" attest --release-dir "$(OUT)" \
		--spec-root "$(SDK_ROOT)/.dependencies/soksak-spec" --tooling-release "$(SDK_RELEASE)" \
		--mode native --platform "$$platform" --architecture "$$architecture" \
		--tool "node=$$node_version" --tool "pnpm=$$pnpm_version"
