# proto-rems

simple tool to generate the missing parts of the default Tailwind spacing scheme.

> IMPORTANT:  this is an extrapolation of the spacing scale within Tailwind.  Not all of these spaces exist in the default configuration.  Please check the documentation...

The output now generates markdown by default:

- range: 0-100
- [default scale](./scale.md)
- [half scales](./halves-scale.md)

## usage

```
node rems --help
```
```
Usage: rems [--start num] [--stop num] [-h] [-e]

Options:
      --help     Show help...                                          [boolean]
      --version  0.0.1                                                 [boolean]
  -x, --start    Start Value                               [number] [default: 0]
  -z, --stop     Stop Value                              [number] [default: 100]
  -h, --halves   Enable Halves                        [boolean] [default: false]
  -e, --export   Export as Config                     [boolean] [default: false]
  -d, --debug    Debug output                         [boolean] [default: false]

copyright 2021
```

## examples

```
node rems --start 80 --stop 90
```

if you want to save the markdown, you can do something like this:

```
node rems > foo.md
```
```
node rems --stop 90 --start 80 > foobar.md
```

if you want to export the spacings so that you can drop them into the tailwind.config.js, you do something like this:

```
node rems --start 76.5 --stop 76.5 -h -e
```

which generates:

```
theme: {
  extend: {
    spacing: {
      "76p5": "19.125rem",
    }
  }
},
```

> **IMPORTANT:**
>   
> _you'll notice that the '.' in the name was replaced with a 'p' to make it compatible with the spacing names allowed in Tailwind..._
> 

## references

- [Default spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) - _the official Tailwind scale_



