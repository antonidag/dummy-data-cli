# .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"

