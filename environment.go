package terminal

import (
	"runtime"
	"sort"
	"strings"
)

// EnvironmentPolicy declares which inherited variables the terminal plugin owns.
// Explicit per-service Environment entries are applied last and may override defaults.
type EnvironmentPolicy struct {
	Remove               []string
	Defaults             map[string]string
	CaseInsensitiveNames bool
}

type Options struct {
	EnvironmentPolicy EnvironmentPolicy
	Environment       map[string]string
}

func DefaultEnvironmentPolicy() EnvironmentPolicy {
	return defaultEnvironmentPolicy(runtime.GOOS)
}

func DefaultOptions() Options {
	return Options{EnvironmentPolicy: DefaultEnvironmentPolicy()}
}

func defaultEnvironmentPolicy(goos string) EnvironmentPolicy {
	policy := EnvironmentPolicy{
		Remove: []string{"NO_COLOR"},
		Defaults: map[string]string{
			"TERM":      "xterm-256color",
			"COLORTERM": "truecolor",
		},
		CaseInsensitiveNames: goos == "windows",
	}
	if goos != "windows" {
		policy.Defaults["LANG"] = "en_US.UTF-8"
		policy.Defaults["LC_CTYPE"] = "en_US.UTF-8"
	}
	return policy
}

func terminalEnvironment(base []string, policy EnvironmentPolicy, additional map[string]string) []string {
	normalize := func(name string) string {
		if policy.CaseInsensitiveNames {
			return strings.ToUpper(name)
		}
		return name
	}
	owned := make(map[string]struct{}, len(policy.Remove)+len(policy.Defaults)+len(additional))
	for _, name := range policy.Remove {
		owned[normalize(name)] = struct{}{}
	}
	for name := range policy.Defaults {
		owned[normalize(name)] = struct{}{}
	}
	for name := range additional {
		owned[normalize(name)] = struct{}{}
	}

	result := make([]string, 0, len(base)+len(policy.Defaults)+len(additional))
	for _, entry := range base {
		name := entry
		if index := strings.IndexByte(entry, '='); index >= 0 {
			name = entry[:index]
		}
		if _, remove := owned[normalize(name)]; !remove {
			result = append(result, entry)
		}
	}

	overridden := make(map[string]struct{}, len(additional))
	for name := range additional {
		overridden[normalize(name)] = struct{}{}
	}
	appendSorted := func(values map[string]string, skip map[string]struct{}) {
		names := make([]string, 0, len(values))
		for name := range values {
			if _, exists := skip[normalize(name)]; !exists {
				names = append(names, name)
			}
		}
		sort.Strings(names)
		for _, name := range names {
			result = append(result, name+"="+values[name])
		}
	}
	appendSorted(policy.Defaults, overridden)
	appendSorted(additional, nil)
	return result
}
