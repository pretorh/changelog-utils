#!/usr/bin/env bash

cli=./out/src/cli.js
failed=0

_exec() {
  fail=$1; shift;

  $cli "$@" >/dev/null 2>&1
  err=$?

  if [ "$err" = "$fail" ] ; then
    echo "ok $*"
  else
    echo "not ok $*"
    failed=1
  fi
}

passes() {
  _exec 0 "$@"
}
fails() {
  _exec 1 "$@"
}

test_count=$(grep --count --extended '^(passes|fails) ' "$0")
echo "1..$test_count"

echo "# auto/cli util"
passes --help
passes help
passes --version

echo "# formatting"
passes CHANGELOG.md
passes CHANGELOG.md latest
fails CHANGELOG.md invalid-formatter
passes format CHANGELOG.md
passes format CHANGELOG.md latest
fails format CHANGELOG.md invalid-formatter

exit $failed
