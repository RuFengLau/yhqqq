set StringArrayThreshold=0.75
set DeadCodeInjectionThreshold=0.4
set Seed=3

javascript-obfuscator ./bin/js/bundle.js --output ./bin/js/bundle.js --dead-code-injection true --dead-code-injection-threshold %DeadCodeInjectionThreshold% --string-array true --string-array-index-shift true --string-array-wrappers-count 2 --string-array-wrappers-chained-calls true --string-array-wrappers-type variable --string-array-threshold %StringArrayThreshold% --target browser-no-eval --identifier-names-generator mangled
