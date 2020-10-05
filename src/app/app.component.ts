// tslint:disable: max-line-length
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RowData } from './row-data';

const COUNTRIES = [{ id: 'afghanistan', name: 'Afghanistan' }, { id: 'ala-aland-islands', name: 'ALA Aland Islands' }, { id: 'albania', name: 'Albania' }, { id: 'algeria', name: 'Algeria' }, { id: 'american-samoa', name: 'American Samoa' }, { id: 'andorra', name: 'Andorra' }, { id: 'angola', name: 'Angola' }, { id: 'anguilla', name: 'Anguilla' }, { id: 'antarctica', name: 'Antarctica' }, { id: 'antigua-and-barbuda', name: 'Antigua and Barbuda' }, { id: 'argentina', name: 'Argentina' }, { id: 'armenia', name: 'Armenia' }, { id: 'aruba', name: 'Aruba' }, { id: 'australia', name: 'Australia' }, { id: 'austria', name: 'Austria' }, { id: 'azerbaijan', name: 'Azerbaijan' }, { id: 'bahamas', name: 'Bahamas' }, { id: 'bahrain', name: 'Bahrain' }, { id: 'bangladesh', name: 'Bangladesh' }, { id: 'barbados', name: 'Barbados' }, { id: 'belarus', name: 'Belarus' }, { id: 'belgium', name: 'Belgium' }, { id: 'belize', name: 'Belize' }, { id: 'benin', name: 'Benin' }, { id: 'bermuda', name: 'Bermuda' }, { id: 'bhutan', name: 'Bhutan' }, { id: 'bolivia', name: 'Bolivia' }, { id: 'bosnia-and-herzegovina', name: 'Bosnia and Herzegovina' }, { id: 'botswana', name: 'Botswana' }, { id: 'bouvet-island', name: 'Bouvet Island' }, { id: 'brazil', name: 'Brazil' }, { id: 'british-indian-ocean-territory', name: 'British Indian Ocean Territory' }, { id: 'british-virgin-islands', name: 'British Virgin Islands' }, { id: 'brunei', name: 'Brunei Darussalam' }, { id: 'bulgaria', name: 'Bulgaria' }, { id: 'burkina-faso', name: 'Burkina Faso' }, { id: 'burundi', name: 'Burundi' }, { id: 'cambodia', name: 'Cambodia' }, { id: 'cameroon', name: 'Cameroon' }, { id: 'canada', name: 'Canada' }, { id: 'cape-verde', name: 'Cape Verde' }, { id: 'cayman-islands', name: 'Cayman Islands' }, { id: 'central-african-republic', name: 'Central African Republic' }, { id: 'chad', name: 'Chad' }, { id: 'chile', name: 'Chile' }, { id: 'china', name: 'China' }, { id: 'christmas-island', name: 'Christmas Island' }, { id: 'cocos-keeling-islands', name: 'Cocos (Keeling) Islands' }, { id: 'colombia', name: 'Colombia' }, { id: 'comoros', name: 'Comoros' }, { id: 'congo-brazzaville', name: 'Congo (Brazzaville)' }, { id: 'congo-kinshasa', name: 'Congo (Kinshasa)' }, { id: 'cook-islands', name: 'Cook Islands' }, { id: 'costa-rica', name: 'Costa Rica' }, { id: 'cote-divoire', name: 'Côte d\'Ivoire' }, { id: 'croatia', name: 'Croatia' }, { id: 'cuba', name: 'Cuba' }, { id: 'cyprus', name: 'Cyprus' }, { id: 'czech-republic', name: 'Czech Republic' }, { id: 'denmark', name: 'Denmark' }, { id: 'djibouti', name: 'Djibouti' }, { id: 'dominica', name: 'Dominica' }, { id: 'dominican-republic', name: 'Dominican Republic' }, { id: 'ecuador', name: 'Ecuador' }, { id: 'egypt', name: 'Egypt' }, { id: 'el-salvador', name: 'El Salvador' }, { id: 'equatorial-guinea', name: 'Equatorial Guinea' }, { id: 'eritrea', name: 'Eritrea' }, { id: 'estonia', name: 'Estonia' }, { id: 'ethiopia', name: 'Ethiopia' }, { id: 'falkland-islands-malvinas', name: 'Falkland Islands (Malvinas)' }, { id: 'faroe-islands', name: 'Faroe Islands' }, { id: 'fiji', name: 'Fiji' }, { id: 'finland', name: 'Finland' }, { id: 'france', name: 'France' }, { id: 'french-guiana', name: 'French Guiana' }, { id: 'french-polynesia', name: 'French Polynesia' }, { id: 'french-southern-territories', name: 'French Southern Territories' }, { id: 'gabon', name: 'Gabon' }, { id: 'gambia', name: 'Gambia' }, { id: 'georgia', name: 'Georgia' }, { id: 'germany', name: 'Germany' }, { id: 'ghana', name: 'Ghana' }, { id: 'gibraltar', name: 'Gibraltar' }, { id: 'greece', name: 'Greece' }, { id: 'greenland', name: 'Greenland' }, { id: 'grenada', name: 'Grenada' }, { id: 'guadeloupe', name: 'Guadeloupe' }, { id: 'guam', name: 'Guam' }, { id: 'guatemala', name: 'Guatemala' }, { id: 'guernsey', name: 'Guernsey' }, { id: 'guinea', name: 'Guinea' }, { id: 'guinea-bissau', name: 'Guinea-Bissau' }, { id: 'guyana', name: 'Guyana' }, { id: 'haiti', name: 'Haiti' }, { id: 'heard-and-mcdonald-islands', name: 'Heard and Mcdonald Islands' }, { id: 'holy-see-vatican-city-state', name: 'Holy See (Vatican City State)' }, { id: 'honduras', name: 'Honduras' }, { id: 'hong-kong-sar-china', name: 'Hong Kong, SAR China' }, { id: 'hungary', name: 'Hungary' }, { id: 'iceland', name: 'Iceland' }, { id: 'india', name: 'India' }, { id: 'indonesia', name: 'Indonesia' }, { id: 'iran', name: 'Iran, Islamic Republic of' }, { id: 'iraq', name: 'Iraq' }, { id: 'ireland', name: 'Ireland' }, { id: 'isle-of-man', name: 'Isle of Man' }, { id: 'israel', name: 'Israel' }, { id: 'italy', name: 'Italy' }, { id: 'jamaica', name: 'Jamaica' }, { id: 'japan', name: 'Japan' }, { id: 'jersey', name: 'Jersey' }, { id: 'jordan', name: 'Jordan' }, { id: 'kazakhstan', name: 'Kazakhstan' }, { id: 'kenya', name: 'Kenya' }, { id: 'kiribati', name: 'Kiribati' }, { id: 'korea-north', name: 'Korea (North)' }, { id: 'korea-south', name: 'Korea (South)' }, { id: 'kuwait', name: 'Kuwait' }, { id: 'kyrgyzstan', name: 'Kyrgyzstan' }, { id: 'lao-pdr', name: 'Lao PDR' }, { id: 'latvia', name: 'Latvia' }, { id: 'lebanon', name: 'Lebanon' }, { id: 'lesotho', name: 'Lesotho' }, { id: 'liberia', name: 'Liberia' }, { id: 'libya', name: 'Libya' }, { id: 'liechtenstein', name: 'Liechtenstein' }, { id: 'lithuania', name: 'Lithuania' }, { id: 'luxembourg', name: 'Luxembourg' }, { id: 'macao-sar-china', name: 'Macao, SAR China' }, { id: 'macedonia', name: 'Macedonia, Republic of' }, { id: 'madagascar', name: 'Madagascar' }, { id: 'malawi', name: 'Malawi' }, { id: 'malaysia', name: 'Malaysia' }, { id: 'maldives', name: 'Maldives' }, { id: 'mali', name: 'Mali' }, { id: 'malta', name: 'Malta' }, { id: 'marshall-islands', name: 'Marshall Islands' }, { id: 'martinique', name: 'Martinique' }, { id: 'mauritania', name: 'Mauritania' }, { id: 'mauritius', name: 'Mauritius' }, { id: 'mayotte', name: 'Mayotte' }, { id: 'mexico', name: 'Mexico' }, { id: 'micronesia', name: 'Micronesia, Federated States of' }, { id: 'moldova', name: 'Moldova' }, { id: 'monaco', name: 'Monaco' }, { id: 'mongolia', name: 'Mongolia' }, { id: 'montenegro', name: 'Montenegro' }, { id: 'montserrat', name: 'Montserrat' }, { id: 'morocco', name: 'Morocco' }, { id: 'mozambique', name: 'Mozambique' }, { id: 'myanmar', name: 'Myanmar' }, { id: 'namibia', name: 'Namibia' }, { id: 'nauru', name: 'Nauru' }, { id: 'nepal', name: 'Nepal' }, { id: 'netherlands', name: 'Netherlands' }, { id: 'netherlands-antilles', name: 'Netherlands Antilles' }, { id: 'new-caledonia', name: 'New Caledonia' }, { id: 'new-zealand', name: 'New Zealand' }, { id: 'nicaragua', name: 'Nicaragua' }, { id: 'niger', name: 'Niger' }, { id: 'nigeria', name: 'Nigeria' }, { id: 'niue', name: 'Niue' }, { id: 'norfolk-island', name: 'Norfolk Island' }, { id: 'northern-mariana-islands', name: 'Northern Mariana Islands' }, { id: 'norway', name: 'Norway' }, { id: 'oman', name: 'Oman' }, { id: 'pakistan', name: 'Pakistan' }, { id: 'palau', name: 'Palau' }, { id: 'palestine', name: 'Palestinian Territory' }, { id: 'panama', name: 'Panama' }, { id: 'papua-new-guinea', name: 'Papua New Guinea' }, { id: 'paraguay', name: 'Paraguay' }, { id: 'peru', name: 'Peru' }, { id: 'philippines', name: 'Philippines' }, { id: 'pitcairn', name: 'Pitcairn' }, { id: 'poland', name: 'Poland' }, { id: 'portugal', name: 'Portugal' }, { id: 'puerto-rico', name: 'Puerto Rico' }, { id: 'qatar', name: 'Qatar' }, { id: 'kosovo', name: 'Republic of Kosovo' }, { id: 'réunion', name: 'Réunion' }, { id: 'romania', name: 'Romania' }, { id: 'russia', name: 'Russian Federation' }, { id: 'rwanda', name: 'Rwanda' }, { id: 'saint-helena', name: 'Saint Helena' }, { id: 'saint-kitts-and-nevis', name: 'Saint Kitts and Nevis' }, { id: 'saint-lucia', name: 'Saint Lucia' }, { id: 'saint-pierre-and-miquelon', name: 'Saint Pierre and Miquelon' }, { id: 'saint-vincent-and-the-grenadines', name: 'Saint Vincent and Grenadines' }, { id: 'saint-barthélemy', name: 'Saint-Barthélemy' }, { id: 'saint-martin-french-part', name: 'Saint-Martin (French part)' }, { id: 'samoa', name: 'Samoa' }, { id: 'san-marino', name: 'San Marino' }, { id: 'sao-tome-and-principe', name: 'Sao Tome and Principe' }, { id: 'saudi-arabia', name: 'Saudi Arabia' }, { id: 'senegal', name: 'Senegal' }, { id: 'serbia', name: 'Serbia' }, { id: 'seychelles', name: 'Seychelles' }, { id: 'sierra-leone', name: 'Sierra Leone' }, { id: 'singapore', name: 'Singapore' }, { id: 'slovakia', name: 'Slovakia' }, { id: 'slovenia', name: 'Slovenia' }, { id: 'solomon-islands', name: 'Solomon Islands' }, { id: 'somalia', name: 'Somalia' }, { id: 'south-africa', name: 'South Africa' }, { id: 'south-georgia-and-the-south-sandwich-islands', name: 'South Georgia and the South Sandwich Islands' }, { id: 'south-sudan', name: 'South Sudan' }, { id: 'spain', name: 'Spain' }, { id: 'sri-lanka', name: 'Sri Lanka' }, { id: 'sudan', name: 'Sudan' }, { id: 'suriname', name: 'Suriname' }, { id: 'svalbard-and-jan-mayen-islands', name: 'Svalbard and Jan Mayen Islands' }, { id: 'swaziland', name: 'Swaziland' },
{ id: 'sweden', name: 'Sweden' }, { id: 'switzerland', name: 'Switzerland' }, { id: 'syria', name: 'Syrian Arab Republic (Syria)' }, { id: 'taiwan', name: 'Taiwan, Republic of China' }, { id: 'tajikistan', name: 'Tajikistan' }, { id: 'tanzania', name: 'Tanzania, United Republic of' }, { id: 'thailand', name: 'Thailand' }, { id: 'timor-leste', name: 'Timor-Leste' }, { id: 'togo', name: 'Togo' }, { id: 'tokelau', name: 'Tokelau' }, { id: 'tonga', name: 'Tonga' }, { id: 'trinidad-and-tobago', name: 'Trinidad and Tobago' }, { id: 'tunisia', name: 'Tunisia' }, { id: 'turkey', name: 'Turkey' }, { id: 'turkmenistan', name: 'Turkmenistan' }, { id: 'turks-and-caicos-islands', name: 'Turks and Caicos Islands' }, { id: 'tuvalu', name: 'Tuvalu' }, { id: 'uganda', name: 'Uganda' }, { id: 'ukraine', name: 'Ukraine' }, { id: 'united-arab-emirates', name: 'United Arab Emirates' }, { id: 'united-kingdom', name: 'United Kingdom' }, { id: 'united-states', name: 'United States of America' }, { id: 'uruguay', name: 'Uruguay' }, { id: 'us-minor-outlying-islands', name: 'US Minor Outlying Islands' }, { id: 'uzbekistan', name: 'Uzbekistan' }, { id: 'vanuatu', name: 'Vanuatu' }, { id: 'venezuela', name: 'Venezuela (Bolivarian Republic)' }, { id: 'vietnam', name: 'Viet Nam' }, { id: 'virgin-islands', name: 'Virgin Islands, US' }, { id: 'wallis-and-futuna-islands', name: 'Wallis and Futuna Islands' }, { id: 'western-sahara', name: 'Western Sahara' }, { id: 'yemen', name: 'Yemen' }, { id: 'zambia', name: 'Zambia' }, { id: 'zimbabwe', name: 'Zimbabwe' }];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  COUNTRY = 'germany';
  URL = 'https://api.covid19api.com/total/country/';
  title = 'Corona';
  graphData = [];
  tableData: Array<RowData> = [];
  countries = COUNTRIES;
  averageDecline = 0;
  days = 0;

  ngOnInit(): void {
    this.loadInfectionData(this.COUNTRY);
  }

  hasEnoughData(): boolean {
    return this.graphData.length > 3 && !this.isDataBroken();
  }

  updateData() {
    this.loadInfectionData(this.COUNTRY);
  }

  // ===========================================================================================

  private isDataBroken(): boolean {
    return this.tableData && this.tableData.length && this.tableData[0].deaths === 0;
  }


  private loadInfectionData(country: string) {
    this.http.get<Array<any>>(this.URL + country).subscribe(
      (data) => {
        let rawData = data.filter(this.filterInfectionData).map(this.convertInfectionData);

        this.graphData = this.glaetten(rawData);
        rawData = this.convertRaw(rawData);

        this.averageDecline = 0;
        this.days = 0;

        const anzahlTage = this.graphData.length;
        if (anzahlTage >= 3) {
          this.averageDecline = (this.graphData[anzahlTage - 3].diff + this.graphData[anzahlTage - 2].diff + this.graphData[anzahlTage - 1].diff) / 3;
          if (this.averageDecline < 0) {
            this.days = Math.round(this.graphData[anzahlTage - 1].value / Math.abs(this.averageDecline));
          }
        }

        this.tableData = this.cleanupList(rawData.slice().reverse());
      }
    );
  }

  private cleanupList(list: Array<any>): Array<RowData> {
    return list.filter(this.hasData);
  }

  private convertInfectionData = (e: any): any => {
    return {
      datum: this.extractDate(e.Date),
      anzahl: e.Active || e.Confirmed - e.Deaths - e.Recovered,
      deaths: e.Deaths
    };
  }

  private filterInfectionData = (e: any): boolean => {

    // an diesem Tag sind die Daten in der Quelle kaputt
    if (e.Date && e.Date.indexOf('2020-06-24T') === 0) {
      return false;
    }

    if (e.Date && e.Date.indexOf('2020-07-08T') === 0) {
      return false;
    }

    // weder krank noch gestorben gibt es nur in Nordkorea ;-)
    return !!(e.Active || e.Deaths);
  }


  private extractDate(d: string): string {
    return d.substr(0, d.indexOf('T'));
  }

  private glaetten(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const amRand = (index === 0 || index === rawData.length - 1);
      const anzahl = Math.round(amRand ? eintrag.anzahl : (rawData[index - 1].anzahl + rawData[index].anzahl + rawData[index + 1].anzahl) / 3);
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({ name: eintrag.datum, value: anzahl, diff });
    });
    return result;
  }

  private convertRaw(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const anzahl = eintrag.anzahl;
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({ name: eintrag.datum, value: anzahl, diff, deaths: eintrag.deaths });
    });
    return result;
  }

  private hasData(eintrag: RowData): boolean {
    return (eintrag.diff !== 0 || eintrag.deaths !== 0);
  }
}
