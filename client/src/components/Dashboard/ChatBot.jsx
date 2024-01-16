import React from 'react';

const ChatBot = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '78vh' }}>
      <style>
        {`
          .center-div {
            align-self: center;
            margin-top: 2vh;
            width: 50vw;
            height: 60vh;
            border:2px solid rgb(102, 71, 255);
            background-color: black;
            border-radius: 15px;
            padding: 5px;
            box-sizing: border-box;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            box-shadow: 0 0 50px rgba(128, 0, 128, 9);
          }

          @media only screen and (max-width: 600px) {
            .center-div {
              height: 40vh;
              width: 80vw;
              background-color: rgb(102, 71, 255);
              border-radius: 15px;
              padding: 5px;
              box-sizing: border-box;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              box-shadow: 0 0 50px rgba(128, 0, 128, 9); 
            }
          }
        `}
      </style>

      <div className="absolute inset-4">
        <div className="center-div relative h-full w-full overflow-clip rounded-md border border-zinc-200 bg-white px-0 py-0">
          <iframe
            style={{ border: 'none' }}
            srcDoc={`<body><script src='https://cdn.botpress.cloud/webchat/v0/inject.js'></script>
            <script>
              window.botpressWebChat.init({
                'composerPlaceholder': 'Chat with bot',
                'botConversationDescription': 'The Conversational Genius',
                'botName': 'EduSphere',
                'botId': 'aa77449c-c123-4ca5-aa26-45e57964f414',
                useSessionStorage: true,
                'hostUrl': 'https://cdn.botpress.cloud/webchat/v0',
                'messagingUrl': 'https://messaging.botpress.cloud',
                'clientId': 'aa77449c-c123-4ca5-aa26-45e57964f414',
                'enableConversationDeletion': true,
                'showPoweredBy': false,
                'className': 'webchatIframe',
                'containerWidth': '100%25',
                'layoutWidth': '100%25',
                'hideWidget': true,
                "lazySocket": true,
                "frontendVersion": "v1",
                'showCloseButton': false,
                "webhookId": "668fcf8b-1f8e-49e9-a8ec-7e7dd27be126",
                'disableAnimations': false,
                'closeOnEscape': false,
                'showConversationsButton': true,
                "useSessionStorage": true,
                'enableTranscriptDownload': true,
                'stylesheet':'https://webchat-styler-css.botpress.app/prod/code/3fcd3e4e-d5bc-4bf5-8699-14b621b3ada2/v31782/style.css'
              });
              window.botpressWebChat.onEvent(function () { window.botpressWebChat.sendEvent({ type: 'show' }) }, ['LIFECYCLE.LOADED']);
            </script></body>`}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
