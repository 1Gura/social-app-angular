import { Component, OnInit } from '@angular/core';
import { UserService } from '../../entities/lib/api/users/users.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectError, selectLoading, selectUsers } from '../../shared/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
  ],
  providers: [
    UserService,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    // this.store.dispatch(loadUserById());
  }
}
