import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import NormalSuggest from './NormalSuggest';
import AccountHeader from './Account';

const CategoryHeader = ({ icon, title }) => (
  <div className="flex items-center mb-2">
    <Image src={icon} alt={title} width={24} height={24} />
    <h2 className="text-blue-600 font-semibold ml-2">{title}</h2>
  </div>
);

function Maincontent() {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [isAITyping, setIsAITyping] = useState(false);

  const categories = [
    {
      icon: '/sparkles.png',
      title: 'Examples',
      items: [
        'Explain quantum computing in simple terms',
        'Got any creative ideas for a 10 year old\'s birthday?',
        'How do I make an HTTP request in Javascript?'
      ]
    },
    {
      icon: '/star.png',
      title: 'Capabilities',
      items: [
        'Remembers what user said earlier in the conversation',
        'Allows user to provide follow-up corrections',
        'Trained to decline inappropriate requests'
      ]
    },
    {
      icon: '/triangle.png',
      title: 'Limitations',
      items: [
        'May occasionally generate incorrect information',
        'May occasionally produce harmful instructions or biased content',
        'Limited knowledge of world and events after 2021'
      ]
    }
  ];

  // Fake backend function
  const fakeBackendResponse = async (message) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always return the specified response
    return `It seems you're encountering error 0E – the water in the drum is not draining out. This is a common error on LG washing machines.

Causes:

The drain hose is blocked by a foreign object or dirt.
The drain hose is positioned higher than recommended.
The drain hose is twisted or blocked at some point.
Fixes:

Check the water filter and clean any debris.
Position the drain hose so that it is on the ground.
Check if the drain hose is twisted or blocked anywhere.

To ensure safety while troubleshooting, follow these steps:
Step 1: Turn off the power

Before doing anything, make sure the washing machine is unplugged to ensure safety.

Step 2: Locate the water filter and drain hose

Look for the drain system located at the bottom front of the washing machine.

[IMAGE_PLACEHOLDER]

Step 3: Remove the filter:

Use a dry towel to catch any water that might spill when removing the filter.
Gently rotate the filter counterclockwise to take it out.
Step 4: Clean the filter:

Use a brush or water to clean off any fabric fibers or debris stuck on the filter.
If the filter is very dirty, you can soak it in warm water with a mild detergent for about 15 minutes, then rinse it clean.
Step 5: Reinstall the filter:

Once it's clean, put the filter back in its original position, ensuring it's tightened securely.

Step 6: Check the washing machine's operation

If the washing machine continues to show an error, it seems like the water pump inside your machine may be having issues. You should seek help from a professional repair service.`;
  };

  const startChat = async (suggestion) => {
    setIsChatStarted(true);
    setMessages([{ type: 'user', content: suggestion, timestamp: new Date() }]);
    setIsLoading(true);
    setIsAITyping(true);
    setTimeout(async () => {
      const response = await fakeBackendResponse(suggestion);
      setMessages(prev => [...prev, { type: 'ai', content: response, timestamp: new Date() }]);
      setIsLoading(false);
      setIsAITyping(false);
    }, 2000);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (inputMessage.trim() || selectedImage || attachedFile) {
      const newMessage = { 
        type: 'user', 
        content: inputMessage, 
        image: selectedImage,
        file: attachedFile,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      setSelectedImage(null);
      setAttachedFile(null);
      setIsLoading(true);
      setIsAITyping(true);
      setTimeout(async () => {
        const response = await fakeBackendResponse(inputMessage);
        setMessages(prev => [...prev, { type: 'ai', content: response, timestamp: new Date() }]);
        setIsLoading(false);
        setIsAITyping(false);
      }, 2000);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachedFile(file);
      }
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
  };

  const formatDate = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' };
    return date.toLocaleTimeString('en-US', options);
  };

  return (
    <main className="flex flex-col h-screen w-screen">
      <div className="flex-shrink-0">
        <AccountHeader />
      </div>
      <Head>
        <title>DENSO - Crafting the Core</title>
      </Head>

      <div className="flex-grow overflow-auto p-8 w-full no-scrollbar">
        {!isChatStarted ? (
          <>
            <header className="mb-8 flex flex-col items-center">
              <img src="/denso-logo.png" alt="DENSO Logo" className="h-[165px]" />
              <p className="text-gray-600 mt-2">Ver 1.0 Sep 22</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index}>
                  <CategoryHeader icon={category.icon} title={category.title} />
                  {category.items.map((item, itemIndex) => (
                    <div onClick={() => startChat(item)} key={itemIndex}>
                      <NormalSuggest suggestion={item} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full w-full">
            <div className="flex-grow overflow-y-auto mb-4 w-full no-scrollbar">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left flex items-start'}`}>
                  {message.type === 'ai' && (
                    <Image src="/denso-logo.png" alt="DENSO Logo" width={24} height={24} className="mr-2 mt-1" />
                  )}
                  <div className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-gray-100 text-gray-700' : 'bg-white'}`}>
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-center mb-2`}>
                      <span className="text-blue-600 text-xs mr-2">{formatDate(new Date(message.timestamp))}</span>
                    </div>
                    <div>
                      {message.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line.startsWith('Causes:') || line.startsWith('Fixes:') || line.startsWith('Step ') ? (
                            <strong>{line}</strong>
                          ) : line === '[IMAGE_PLACEHOLDER]' ? (
                            <img src="/plz.png" alt="Washing Machine" className="my-2 max-w-full" />
                          ) : (
                            line
                          )}
                          <br />
                        </React.Fragment>
                      ))}
                      {message.image && <img src={message.image} alt="User upload" className="mt-2 max-w-xs" />}
                      {message.file && (
                        <div className="flex items-center bg-pink-100 rounded-lg p-2 mt-2">
                          <div className="bg-pink-500 text-white rounded p-2 mr-2">
                            📄
                          </div>
                          <div className="flex-grow">
                            <div className="font-semibold">{message.file.name}</div>
                            <div className="text-xs text-gray-500">{message.file.type}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isAITyping && (
                <div className="flex items-start mb-4">
                  <Image src="/denso-logo.png" alt="DENSO Logo" width={24} height={24} className="mr-2 mt-1" />
                  <div className="inline-block p-2 rounded-lg bg-white">
                    <div className="flex justify-start items-center">
                      <span className="text-blue-600 text-xs mr-2">{formatDate(new Date())}</span>
                    </div>
                    <div className="typing-animation">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border-t w-full">
        <div className="max-w-[800px] mx-auto p-6">
          {attachedFile && (
            <div className="flex items-center bg-pink-100 rounded-lg p-2 mb-2">
              <div className="bg-pink-500 text-white rounded p-2 mr-2">
                📄
              </div>
              <div className="flex-grow">
                <div className="font-semibold">{attachedFile.name}</div>
                <div className="text-xs text-gray-500">{attachedFile.type}</div>
              </div>
              <button onClick={removeAttachedFile} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
          )}
          {selectedImage && (
            <div className="flex justify-start mb-2">
              <img src={selectedImage} alt="Selected" className="h-[110px] object-contain" />
            </div>
          )}
          <div className="flex justify-end mb-2">
            <button className="flex items-center space-x-2 text-blue-600 px-3 py-1 rounded-full font-semibold text-sm"
              onClick={() => {setIsChatStarted(false); setMessages([]);}}
            >
              <Image src="/Frame 154.png" width={118} height={24} alt="New dialog" />	
            </button>
          </div>
          <form onSubmit={(event) => { sendMessage(event); setIsChatStarted(true); }} className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-full">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Image src="/attachment-01.png" alt="Attachment" width={16} height={16} />
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </label>
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send a message" 
              className="flex-grow mx-2 bg-transparent outline-none text-sm"
            />
            <Image src="/microphone-01.png" alt="Microphone" width={16} height={16} className="cursor-pointer mr-1" />
            <button type="submit" disabled={isLoading}>
              <Image src="/telegram-fill.png" alt="Send" width={16} height={16} className="cursor-pointer" />
            </button>
          </form>
        </div>
      </div> 
    </main>
  )
}

export default Maincontent;