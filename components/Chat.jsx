import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getCookie } from 'cookies-next/client';

const socket = io.connect('http://localhost:4000'); // Connect to the server where the socket is running

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUserId] = useState(getCookie('user_id'));
  const [currentUserName] = useState(getCookie('user_name')); // Get the user ID from cookies

  // Set up the socket event listener when the component mounts
  useEffect(() => {
    // Listen for the 'load_messages' event to get the message history
    socket.on('load_messages', (messageHistory) => {
      setMessages(messageHistory); // Update state with the loaded messages
    });

    // Listen for incoming messages
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to state
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      socket.off('load_messages');
      socket.off('receive_message');
    };
  }, []);

  // Function to send a new message
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { senderId: currentUserId, content: message, senderName:currentUserName };
      
      // Emit the message to the server (to broadcast to all clients)
      socket.emit('send_message', newMessage);

      // Optimistically update the UI with the new message
      // setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the message input
      setMessage('');
    }
  };

  return (
    <div className="chat-box p-4 bg-neutral-focus rounded-lg shadow-lg shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Project Chat</h3>
      
      {/* Render the message list */}
      <div className="message-list mb-4 max-h-60 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === currentUserId ? 'text-right' : 'text-left'}`}
          >
            <div className="flex items-center">
              {/* Display the first letter of the user's ID */}
              <div className="w-6 h-6 bg-gray-500 text-white rounded-full text-xs flex justify-center items-center mr-2">
                {msg.senderName[0].toUpperCase()}  {/* First letter of senderId */}
              </div>
              {/* Display the message */}
              <p
                className={`py-2 px-4 inline-block ${
                  msg.senderId === currentUserId
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-300 text-black'
                } rounded-lg`}
              >
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="input input-bordered w-full mb-2 bg-neutral-focus text-neutral-content"
      />
      
      {/* Send button */}
      <button onClick={sendMessage} className="btn bg-cyan-400 hover:bg-cyan-500 text-white w-full">
        Send
      </button>
    </div>
  );
};

export default Chat;
