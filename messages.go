package terminal

import "github.com/soksak/soksak-core/core/i18n"

// The refusals this service answers a caller with. A caller reads these over
// the command registry, so they are declared here rather than formatted at the
// call site.

func init() {
	i18n.Declare(map[string]i18n.Sentence{
		"terminal.open.identityAndSize": {
			EN: "terminal identity and size are required",
			KO: "터미널 식별자와 크기가 필요합니다",
		},
		"terminal.open.replayUnsupported": {
			EN: `this terminal owner has no output ring for warm replay`,
			KO: `이 터미널 소유자는 웜 재생용 출력 링을 제공하지 않습니다`,
		},
		"terminal.open.shuttingDown": {
			EN: "terminal service is shutting down",
			KO: "터미널 서비스가 종료 중입니다",
		},
		"terminal.session.noOwner": {
			EN: "terminal owner does not exist: {id}/{generation}",
			KO: "터미널 소유자가 없습니다: {id}/{generation}",
		},
		"terminal.resize.zeroSize": {
			EN: "terminal size must be non-zero",
			KO: "터미널 크기는 0 이면 안 됩니다",
		},
	})
}
