import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';

const VideoCallPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsCallActive(true);
    } catch (error) {
      alert('Camera or microphone access denied');
    }
  };


  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setIsCallActive(false);
    setIsMicOn(true);
    setIsCameraOn(true);
  };


  const toggleMic = () => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicOn(track.enabled);
    });
  };

  const toggleCamera = () => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsCameraOn(track.enabled);
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Video Call</h1>

      <div className="bg-black rounded-lg h-96 flex items-center justify-center mb-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="h-full rounded-lg"
        />
      </div>

      <div className="flex gap-3">
        {!isCallActive ? (
          <Button onClick={startCall} variant="success">
            Start Call
          </Button>
        ) : (
          <Button onClick={endCall} variant="error">
            End Call
          </Button>
        )}

        <Button onClick={toggleMic} variant="secondary">
          {isMicOn ? 'Mute Mic' : 'Unmute Mic'}
        </Button>

        <Button onClick={toggleCamera} variant="secondary">
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </Button>
      </div>
    </div>
  );
};

export default VideoCallPage;
