#!/usr/bin/env python3
# case-py-gate.py — the loom's gate for the python to_camel_case/to_snake_case
# build (golden pairs: the test decides, never the prose).
# Usage: python3 case-py-gate.py <path-to-built-module>
import sys

src = open(sys.argv[1]).read()
ns = {}
exec(src, ns)

cases = [
    (ns["to_camel_case"]("hello world"), "helloWorld"),
    (ns["to_camel_case"]("snake_case_text"), "snakeCaseText"),
    (ns["to_camel_case"]("alreadyCamel"), "alreadyCamel"),
    (ns["to_camel_case"](""), ""),
    (ns["to_snake_case"]("helloWorld"), "hello_world"),
    (ns["to_snake_case"]("fooBarBaz"), "foo_bar_baz"),
    (ns["to_snake_case"]("hello world"), "hello_world"),
    (ns["to_snake_case"]("already_snake"), "already_snake"),
    (ns["to_snake_case"](""), ""),
]

fail = 0
for got, want in cases:
    if got != want:
        print("FAIL", repr(got), "want", repr(want))
        fail += 1
    else:
        print("ok", repr(got))
sys.exit(1 if fail else 0)