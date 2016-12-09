export class File {
  public name;
  public path;
  public size;
  public type;
  public created;
  public modified;
  public stats;
  public isDir;
  public isFile;
  public isLink;
  public mime;

  constructor(obj?: any) {
    this.name = obj && obj.name ? obj.name : null;
    this.path = obj && obj.path ? obj.path : null;
    this.size = obj && obj.size ? obj.size : null;
    this.type = obj && obj.type ? obj.type : null;
    this.created = obj && obj.created ? obj.created : null;
    this.modified = obj && obj.modified ? obj.modified : null;
    this.stats = obj && obj.stats ? obj.stats : {};
    this.isDir = obj && obj.isDir ? obj.isDir : null;
    this.isFile = obj && obj.isFile ? obj.isFile : null;
    this.isLink = obj && obj.isLink ? obj.isLink : null;
    this.mime = obj && obj.mime ? obj.mime : null;
  }
}
