import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  apiUrl = 'https://hp-api.onrender.com/api';

  private http = inject(HttpClient);

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl + '/characters');
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl + '/characters/house/' + house);
  }

  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character[]>(this.apiUrl + '/character/' + id)
      .pipe(map((data: Character[]) => data[0]));
  }
}
