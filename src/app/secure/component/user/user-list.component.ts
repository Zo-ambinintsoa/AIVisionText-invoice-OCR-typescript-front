import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any[] = [];
  showDetails: boolean = false;
  selectedUser: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load the list of users when the component is initialized
    this.loadUsers();
  }

  // Load the list of users from the JSON server
  loadUsers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      this.userList = data;
    });
  }

  // Function to toggle the visibility of user details
  toggleUserDetails(userId: number): void {
    if (userId === this.selectedUser.id) {
      // Toggle the details visibility
      this.showDetails = !this.showDetails;
    } else {
      // If details are not shown, fetch user details and show them
      this.http.get(`http://localhost:3000/users/${userId}`).subscribe(
        (userDetails: any) => {
          this.selectedUser = userDetails;
          this.showDetails = true;
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }

  // Function to delete a user
  deleteUser(id: number) {
    const apiUrl = `http://localhost:3000/users/${id}`;
    this.http.delete(apiUrl).subscribe(
      () => {
        // Success: User deleted, you can handle this as needed (e.g., update userList)
        console.log(`User with ID ${id} deleted successfully.`);
        // Reload the list of users after deletion
        this.loadUsers();
      },
      (error) => {
        // Handle errors here
        console.error(`Error deleting user with ID ${id}:`, error);
        // You can show an error message or take other actions based on the error.
      }
    );
  }


}
