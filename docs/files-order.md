## Files and it's order within a pattern

- `_example.scss`
- `example.twig`
- `example.yml`
- `example-variation.yml
- `example.md`
- `example~variation.md

If variation is present, the order of the files are important. `.twig` should always be above `.yml` and `.md` otherwise variation if above the default will be displayed first. If needed you can preffix it with digits`00-example.twig`.

Variation title will be used what comes after tilda in `example~variation.yml` but if you all `.yml` files are loaded before `.md` files Patternlab will use the actual title in the markdown file.

* The use of interger after tilda in the variation files wil cause issues.
