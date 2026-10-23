# Board materials

All material maps are bundled locally. The homepage does not contact texture providers at runtime.

- `cork.webp`: [Cork 001 from ambientCG](https://ambientcg.com/view?id=Cork001), the color map from the 1K JPG material package. Resampled to 768 px and encoded as WebP. Its fine apparent grain, warm grade and directional lighting are applied in CSS. The source describes its creation method as approximation. It is a material map, not a photograph of this complete board.
- `oak.webp`: [Oak Veneer 01 from Poly Haven](https://polyhaven.com/a/oak_veneer_01), the 1K diffuse JPG map. Resampled to 512 px and encoded as WebP.
- `oak-horizontal.webp`: the same oak map, rotated 90 degrees so grain follows the top and bottom frame rails.

These assets are released under CC0 1.0 by their providers. Sources: [ambientCG license](https://docs.ambientcg.com/license/), [Poly Haven license](https://polyhaven.com/license), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

Downloads used:

- <https://ambientcg.com/get?file=Cork001_1K-JPG.zip>
- <https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/oak_veneer_01/oak_veneer_01_diff_1k.jpg>

The project screenshots remain separate HTML images. Wood, cork and lighting never become a flattened homepage image. Pins and thread are code-native SVG geometry, gradients and filters in `../board-overlay.svg`.
