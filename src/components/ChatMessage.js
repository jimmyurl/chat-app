const ChatMessage = ({ message }) => {
    return (
      <div
        className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] rounded-lg p-3 ${
            message.type === 'outgoing'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100'
          }`}
        >
          {message.content.type === 'image' ? (
            <div className="space-y-2">
              <img 
                src={message.content.url} 
                alt="Uploaded content"
                className="rounded-lg max-w-full"
              />
              <p className="text-sm">{message.content.caption}</p>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content.text}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default ChatMessage;