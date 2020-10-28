# SOCKET COMMUNICATION DOCS

## EVENTS:


### SERVER:

`create_room_success` &rightarrow; emitted from the server, returns the created room id

`create_room_failure` &rightarrow; emitted from the server, no payload

`room_request_success`  &rightarrow; emmited from the server to the client to indicate that `room_request` event was succesful. payload: { room: Object }

`new_user`

`remove_user`

`username_exists` &rightarrow; emited from the server to the client to indicate username is taken

### CLIENT

`room_request` &rightarrow; emitted from the client to request a room join. payload: { roomId: String, username: String };

`create_room` &rightarrow; emitted from the client to create a room.

`start_game` &rightarrow; emitted from the client (admin) to start the game
