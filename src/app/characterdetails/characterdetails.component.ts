import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: false,
  templateUrl: './characterdetails.component.html',
  styleUrls: ['./characterdetails.component.css']
})
export class CharacterdetailsComponent implements OnInit {

  character = signal<Character | null>(null);
  loading = signal(true);

  private route = inject(ActivatedRoute);
  private characterService = inject(CharacterService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.log('Error loading character', err);
          this.loading.set(false);
        }
      });
    }
  }
}
