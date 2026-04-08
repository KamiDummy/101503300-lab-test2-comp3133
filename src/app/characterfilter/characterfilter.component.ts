import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharacterService } from '../services/character.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterfilter',
  standalone: false,
  templateUrl: './characterfilter.component.html',
  styleUrls: ['./characterfilter.component.css']
})
export class CharacterfilterComponent implements OnInit {

  houses: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  houseControl = new FormControl('');

  characters = signal<Character[]>([]);
  loading = signal(false);

  private characterService = inject(CharacterService);

  ngOnInit(): void {
    this.houseControl.valueChanges.subscribe(value => {
      this.loadByHouse(value || '');
    });
  }

  loadByHouse(house: string): void {
    if (!house) {
      this.characters.set([]);
      return;
    }
    this.loading.set(true);
    this.characterService.getCharactersByHouse(house.toLowerCase()).subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log('Error loading characters', err);
        this.loading.set(false);
      }
    });
  }
}
