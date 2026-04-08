import { Component, inject, OnInit, signal } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterlist',
  standalone: false,
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css']
})
export class CharacterlistComponent implements OnInit {

  characters = signal<Character[]>([]);
  loading = signal(true);

  private characterService = inject(CharacterService);

  ngOnInit(): void {
    this.characterService.getAllCharacters().subscribe({
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
