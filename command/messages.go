package command

import "github.com/soksak/soksak-core/core/i18n"

// The refusals this group answers a caller with. A caller reads these over the
// command registry, so they are declared here rather than formatted at the
// call site.

func init() {
	i18n.Declare(map[string]i18n.Sentence{
		"terminal.args.missing": {
			EN: `{command}: missing argument "{name}"`,
			KO: `{command}: 인자 "{name}" 이(가) 없습니다`,
		},
		"terminal.args.missingSize": {
			EN: `{command}: missing argument "{name}" — the caller supplies the pane's screen size`,
			KO: `{command}: 인자 "{name}" 이(가) 없습니다 — 판의 화면 크기는 호출자가 지정합니다`,
		},
		"terminal.args.zeroSize": {
			EN: `{command}: argument "{name}" must not be zero — a zero winsize leaves a full-screen program nothing to draw into`,
			KO: `{command}: 인자 "{name}" 은(는) 0 이면 안 됩니다 — winsize 가 0 이면 전체 화면 프로그램이 그릴 자리가 없습니다`,
		},
		"terminal.args.nullText": {
			EN: `{command}: argument "{name}" is null — send the text, or nothing at all`,
			KO: `{command}: 인자 "{name}" 이(가) null 입니다 — 문자열을 보내거나 아예 생략하십시오`,
		},
		"terminal.args.emptyPane": {
			EN: `{command}: argument "{name}" is empty — no pane is named by it`,
			KO: `{command}: 인자 "{name}" 이(가) 비어 있습니다 — 지정된 판이 없습니다`,
		},
		"terminal.args.zeroSessionID": {
			EN: `{command}: argument "{name}" must not be zero — session ids are minted from 1`,
			KO: `{command}: 인자 "{name}" 은(는) 0 이면 안 됩니다 — 세션 id 는 1 부터 발급됩니다`,
		},
		"terminal.args.negativeCount": {
			EN: `{command}: argument "{name}" must not be negative`,
			KO: `{command}: 인자 "{name}" 은(는) 음수이면 안 됩니다`,
		},
		"terminal.args.replayMode": {
			EN: `{command}: argument "{name}" is "{mode}"; use "none" or an object with fromSeq`,
			KO: `{command}: 인자 "{name}"의 값 "{mode}"은 지원되지 않습니다. "none" 또는 fromSeq 객체를 사용하십시오`,
		},
		"terminal.args.replayRange": {
			EN: `{command}: argument "{name}" must contain only a non-negative integer fromSeq`,
			KO: `{command}: 인자 "{name}"에는 0 이상의 정수 fromSeq만 있어야 합니다`,
		},
		"terminal.args.replayWithPlacement": {
			EN: `{command}: replay cannot be combined with cwd or shell because placement starts a new session`,
			KO: `{command}: replay는 새 세션을 시작하는 cwd 또는 shell과 함께 사용할 수 없습니다`,
		},
	})
}

// The refusals session identity and the session table answer a caller with. A
// caller reads these over the command registry, so they are declared here
// rather than formatted at the call site.

func init() {
	i18n.Declare(map[string]i18n.Sentence{
		"terminal.session.emptyPaneID": {
			EN: `{command}: argument "{name}" is empty — a pane id that names nothing cannot key a session (send no paneId at all for a session with no reattach key)`,
			KO: `{command}: 인자 "{name}" 이(가) 비어 있습니다 — 아무것도 지정하지 않는 판 id 는 세션 키가 될 수 없습니다(재접속 키가 없는 세션이면 paneId 를 아예 보내지 마십시오)`,
		},
		"terminal.session.separatorInHalf": {
			EN: `{command}: argument "{name}" contains "{separator}", which would let two panes derive one session key`,
			KO: `{command}: 인자 "{name}" 에 "{separator}" 가 있습니다 — 두 판이 같은 세션 키를 만들 수 있습니다`,
		},
		"terminal.session.unknown": {
			EN: `{command}: no session {id} — it was never opened here, or it was closed or replaced`,
			KO: `{command}: 세션 {id} 이(가) 없습니다 — 여기서 열린 적이 없거나, 닫혔거나 교체되었습니다`,
		},
		"terminal.open.placementUnsupported": {
			EN: `{command}: argument "{name}" is set and this terminal owner cannot honour it — disregarding it would start the shell somewhere the caller did not ask for, with no way to tell`,
			KO: `{command}: 인자 "{name}" 이(가) 지정되었으나 이 터미널 소유자는 처리할 수 없습니다 — 무시하면 호출자가 요청하지 않은 위치에서 셸이 시작되고, 그것을 확인할 방법이 없습니다`,
		},
		"terminal.closeWindow.someLeftRunning": {
			EN: `{command}: {closed} closed, {running} left running ({detail})`,
			KO: `{command}: {closed} 개를 닫았고 {running} 개가 실행 중으로 남았습니다({detail})`,
		},
	})
}
