io.on('connection', (socket) => {
    console.log('A user connected.');
  
    socket.on('join', (username) => {
      socket.username = username;
      console.log(`${socket.username} joined the chat.`);
    });
  
    socket.on('send-message', ({ recipient, message }) => {
      const chatMessage = new Chat({
        sender: socket.username,
        recipient,
        message,
      });
  
      chatMessage.save((err) => {
        if (err) {
          console.error(err);
        } else {
          const recipientSocket = Object.values(io.sockets.sockets).find(
            (s) => s.username === recipient
          );
  
          if (recipientSocket) {
            socket.emit('new-message', chatMessage);
            recipientSocket.emit('new-message', chatMessage);
          } else {
            socket.emit('new-message', chatMessage);
          }
        }
      });
    });
  
    socket.on('disconnect', () => {
      console.log(`${socket.username} left the chat.`);
    });
  });