# Código5 Signature Widget
That's a JS widget to inject the Código5.com.br private signature automagically.

## How to Install
- Insert the tag `<div class="codigo5-signature-widget-wrapper"></div>` with any selector you want
- Load the script
```javascript
<script src="http://cdn.codigo5.com.br/signature/signature-widget.min.js"></script>
<script>cod5.signatureWidget.bootstrap({ theme: 'dark' });</script>
```

## Options
| Name           | Description                            | Type                 | Valid options                                                                                                                  | Default value                                                      |
|----------------|----------------------------------------|----------------------|--------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `selector`     | DOMElement selector                    | string               | any                                                                                                                            | `'.codigo5-signature-widget-wrapper'`                              |
| `autoLoadDeps` | Whether or not load the dependencies   | boolean              | true/false                                                                                                                     | `true`                                                             |
| `theme`        | Theme identifier                       | enum, string, number | dark/light                                                                                                                     | `'light'`                                                          |
| `cdnBaseUrl`   | CDN base url to fetch the dependencies | string               | any                                                                                                                            | `'http://cdn.codigo5.com.br/signature/'` |
| `logoWidth`    | Logo image width                       | string, number       | any                                                                                                                            | `200`                                                              |
| `logoHeight`   | Logo image height                      | string, number       | any                                                                                                                            | `49`                                                               |

## Contributors
You can view the authors [right here](https://github.com/codigo5/codigo5-signature-widget/graphs/contributors).

## Contributing
Check [CONTRIBUTING.md](https://github.com/codigo5/codigo5-signature-widget/blob/master/CONTRIBUTING.md).

## Questions
Do you have any question? [Contact us](http://www.codigo5.com.br).

## License
Código5 Signature Widget is licensed under the [MIT license](https://github.com/codigo5/codigo5-signature-widget/blob/master/LICENSE).
