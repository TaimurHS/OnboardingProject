export class Todo {
  sno: number;
  title: string;
  desc: string;
  active: boolean;

  constructor(_sno: number, _title: string, _desc: string, _active: boolean) {
    this.sno = _sno;
    this.title = _title;
    this.desc = _desc;
    this.active = _active;
  }
}
