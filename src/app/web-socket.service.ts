import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private isConnected = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Initialize WebSocket connection
  connect(): void {
    const socket = new SockJS('http://localhost:8080/ws'); // URL to your WebSocket endpoint
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.isConnected.next(true);
      
      // Subscribe to topic (e.g., document updates)
      this.stompClient.subscribe('/topic/greetings', (message: any) => {
        console.log(message);
        
        console.log('Message received: ', message.body);
        // Handle received message here
      });
    }, (error: string) => {
      console.error('Error during WebSocket connection:', error);
      this.isConnected.next(false);
    });
  }

  // Send a message through WebSocket
  sendMessage(destination: string, body: any): void {
    console.log(body);
    
    this.stompClient.send(`/app/${destination}`, {}, body);
    console.log('success');
    
  }

  // Disconnect from WebSocket
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  }

  // Observable to monitor connection status
  getConnectionStatus() {
    return this.isConnected.asObservable();
  }
}
