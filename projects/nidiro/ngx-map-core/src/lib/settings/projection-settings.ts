export class ProjectionSettings {
  /**
   * Projection to be used to represent data on Map. Unit: meters.
   */
  static readonly SPHERICAL_MERCATOR = 'EPSG:3857';
  /**
   * Projection to be used to read and write coordinates from the DB. Unit: degrees.
   * a.k.a. WGS 84
   */
  static readonly WORLD_GEODETIC_SYSTEM = 'EPSG:4326';
}
