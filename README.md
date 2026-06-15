# soksak-plugin-terminal

A soksak plugin that adds a **Terminal** entry to the new-tab (+) menu.

## Registered Programs

| Program id | Behavior |
|---|---|
| `terminal` | Plain terminal view (no auto-run command) |

## Equivalent via Commands

```bash
sok view.open '{"program":"terminal"}'
sok program.list   # list registered programs
```

## Permissions

- `programs` — registers the program in the + menu
