export class UserService {
    
    public getMessage(): string {
      return "User Service";
    }
  
    public getAllUsers(): { id: number; name: string }[] {
      // Dummy users for now
      return [
        { id: 1, name: "Sohidul" },
        { id: 2, name: "Ananto" },
      ];
    }
  }
  