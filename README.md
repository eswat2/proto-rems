# proto-rems

simple tool to generate the missing parts of the default Tailwind spacing scheme.

> IMPORTANT:  this is an extrapolation of the spacing scale within Tailwind.  Not all of these spaces exist in the default configuration.  Please check the documentation...

The output now generates markdown:

- range: 0-100
- [default scale](./scale.md)
- [half scales](./halves-scale.md)

## examples

```
yarn rems --help
```
```
yarn rems --stop 90 --start 80
```

if you want to save the markdown, run the following:

```
node index.js > foo.md
```
```
node index.js --stop 90 --start 80 > foobar.md
```

## references

- [Default spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) - _the official Tailwind scale_



