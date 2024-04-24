export class MapLibreCoreSettings {
  static readonly allegedlyOpenSourceBaseLayers = {
    /**
     * CARTO is declared as BSD-3 in [GitHub](https://github.com/CartoDB/basemap-styles?tab=License-1-ov-file#readme),
     * but their (Legal site)[https://carto.com/legal] has a Google Doc PDF specifying a commercial-use. Be cautious.
     */
    CARTO: {
      darkMatter: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      positron: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
    },
    /**
     * From [OpenStreetMap.org](https://www.openstreetmap.org/)
     */
    OSM: {
      default: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19
          }
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm"
          }
        ]
      }

    }
  }
}
