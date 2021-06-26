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
Usage: rems [--start num] [--stop num] [-h] [-e] [-p]

Options:
      --help     Show help...                                          [boolean]
      --version  0.0.1                                                 [boolean]
  -x, --start    Start Value                               [number] [default: 0]
  -z, --stop     Stop Value                              [number] [default: 100]
  -h, --halves   Enable Halves                        [boolean] [default: false]
  -e, --export   Export as Config                     [boolean] [default: false]
  -p, --pixels   Export Pixels                        [boolean] [default: false]
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

## export

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

## pixels

if you really only want to work with pixels, you can export the spacing scale with the '-p' option and it will output pixels instead of rems:

```
node rems --start 76.5 --stop 76.5 -h -p
node rems --start 76.5 --stop 76.5 -h -e -p
```

both generate:

```
theme: {
  extend: {
    spacing: {
      "76p5": "306px",
    }
  }
},
```

## references

- [Default spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) - _the official Tailwind scale_


## footnote

this is the base definition which this tool uses:

```
const base = {
  tag: 0.5,
  rem: 0.125,
  px: 2,
};
```

everything else is built from this base...

> a variation of this tool could easily be created as a tailwind plugin so that you wouldn't need to manually paste the exports into your tailwind config.  
> 
> Create an issue on GitHub, if you think this would be useful...
> 



