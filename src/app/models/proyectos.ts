export class Proyectos {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public address: string;
  public street: string;
  public 'suite': string;
  public 'city': string;
  public zipcode: string;

  public lat: string;
  public lng: string;

  constructor(cod: number, nom: string, user: string, mail: string,
    addr: string, street: string, suite: string, city: string, zip: string,
    lat: string, lng: string) {
    this.id = cod;
    this.name = nom;    
    this.username = user;
    this.email = mail;
    this.address = addr;
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zip;
    this.lat = lat;
    this.lng = lng;
    
  }
}
