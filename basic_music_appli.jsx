import React, { useState, useRef, useEffect } from 'react';

const defaultSongs = [
  {
    id: '1',
    title: 'Your Ways Are Better',
    artist: 'Forrest Frank',
    category: 'Praise & Worship',
    audioSrc: '/public/your_ways_better.mp3.mp3',
    lyrics: [
      { time: 0, text: 'When I’m overwhelmed within' },
      { time: 3, text: 'From the weight of all my sin' },
      { time: 6, text: 'I need a friend to call my own' },
      { time: 9, text: 'I need a house to call my home' },
      { time: 12, text: 'When I’m broken down inside' },
      { time: 15, text: 'And there’s nowhere else to hide' },
      { time: 18, text: 'I need a place where I feel known' },
      { time: 21, text: 'Can someone help me?' },
      { time: 24, text: 'Then I hear your reply' },
      { time: 27, text: 'Bringing teardrops to my eyes' },
      { time: 30, text: 'Saying I’m not alone' },
      { time: 33, text: 'Oh Lord, I need you now more than ever' },
      { time: 36, text: 'Would you put my heart back together' },
      { time: 39, text: 'I searched the world till my head hurt' },
      { time: 42, text: 'Just to find out your way’s better' },
      { time: 45, text: 'Oh-oh, your ways better' },
      { time: 48, text: 'Oh-oh, your ways better' },
      { time: 51, text: 'Oh, Lord, your ways better' },
      { time: 54, text: 'Jesus, your ways better' },
      { time: 57, text: 'Lord, I am so thankful for the ways that you blessed me' },
      { time: 60, text: 'Everything you say making waves like a jetski' },
      { time: 63, text: 'You love every part of me, even when I was messy' },
      { time: 66, text: 'Now I see the heart in your beauty' },
      { time: 69, text: 'So, I can finally sing Jehovah-Jireh provider' },
      { time: 72, text: 'Your way always gets me higher' },
      { time: 75, text: 'Even on my darkest days, you’re a lighter' },
      { time: 78, text: 'My Messiah' },
      { time: 81, text: 'Oh Lord, I need you now more than ever' },
      { time: 84, text: 'Would you put my heart back together' },
      { time: 87, text: 'I searched the world till my head hurt' },
      { time: 90, text: 'Just to find out your way’s better' },
      { time: 93, text: 'Oh-oh, your ways better' },
      { time: 96, text: 'Oh-oh, your ways better' },
      { time: 99, text: 'Oh, Lord, your ways better' },
      { time: 102, text: 'Jesus, your ways better' },
      { time: 105, text: 'Ohh-ohh, your ways better' },
      { time: 108, text: 'Ohh-ohh, your ways better' },
      { time: 111, text: 'Ohh-ohh, your ways better' },
      { time: 114, text: 'Jesus, your ways better' },
      { time: 117, text: 'It’s better, better, better' },
      { time: 120, text: 'It’s better, better, better' },
      { time: 123, text: 'It’s better, better, better' },
      { time: 126, text: 'It’s better than the rest.' },,
    ],
  },
];

const categories = ['All', ...new Set(defaultSongs.map(song => song.category))];

const Header = () => (
  <header className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-6 shadow-lg rounded-b-3xl">
    <h1 className="text-4xl font-bold text-center font-inter">Christian Music App</h1>
  </header>
);

const HeroSection = () => (
  <section className="text-center py-8 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-b-xl">
    <h2 className="text-2xl md:text-3xl font-bold">Worship Anywhere, Anytime</h2>
    <p className="mt-2 text-md md:text-lg font-light">Your favorite Christian music, with synced lyrics and inspiration.</p>
  </section>
);

const Categories = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="flex flex-wrap justify-center gap-2 mt-6">
    {categories.map(category => (
      <button
        key={category}
        onClick={() => onSelectCategory(category)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
        ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-indigo-100'}`}
      >
        {category}
      </button>
    ))}
  </div>
);

const SongList = ({ songs, selectedCategory, onSelectSong, currentSongId }) => {
  const filtered = selectedCategory === 'All' ? songs : songs.filter(song => song.category === selectedCategory);

  return (
    <ul className="max-w-3xl mx-auto mt-6 px-4 grid gap-4">
      {filtered.map(song => (
        <li
          key={song.id}
          onClick={() => onSelectSong(song)}
          className={`flex items-center gap-4 p-4 rounded-2xl shadow-sm cursor-pointer transition-all
            ${song.id === currentSongId ? 'bg-indigo-50 border-l-4 border-indigo-600' : 'bg-white hover:shadow-md'}`}
        >
          <div className="bg-indigo-100 text-indigo-700 p-3 rounded-full">🎵</div>
          <div>
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-600">{song.artist} · {song.category}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const Player = ({ currentSong, isPlaying, currentTime, onPlayPause, onSeek }) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioSrc;
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => onSeek(audioRef.current.currentTime);

  const handleSeekClick = (e) => {
    const width = progressRef.current.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    const newTime = (offsetX / width) * duration;
    audioRef.current.currentTime = newTime;
    onSeek(newTime);
  };

  const format = s => `${Math.floor(s / 60)}:${('0' + Math.floor(s % 60)).slice(-2)}`;
  const duration = audioRef.current?.duration || 0;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg">
      {currentSong ? (
        <>
          <h2 className="text-xl font-bold text-center">{currentSong.title}</h2>
          <p className="text-center text-gray-500">{currentSong.artist}</p>
          <div ref={progressRef} onClick={handleSeekClick} className="w-full bg-gray-200 h-3 rounded-full mt-4 cursor-pointer">
            <div className="bg-indigo-600 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-500">
            <span>{format(currentTime)}</span>
            <span>{format(duration)}</span>
          </div>
          <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => onPlayPause(false)} preload="metadata" />
          <div className="flex justify-center gap-6 mt-6">
            <button onClick={() => onPlayPause(!isPlaying)} className="bg-indigo-600 text-white p-3 rounded-full shadow-md hover:bg-indigo-700">
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          </div>
          <div className="mt-6 max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg border">
            {currentSong.lyrics.map((line, i) => (
              <p key={i} className={`${currentTime >= line.time ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}>{line.text}</p>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Select a song to play</p>
      )}
    </div>
  );
};

const App = () => {
  const [songs, setSongs] = useState(defaultSongs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="min-h-screen bg-rose-100 text-gray-900 font-inter">
      <Header />
      <HeroSection />
      <Categories categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <SongList songs={songs} selectedCategory={selectedCategory} onSelectSong={song => { setCurrentSong(song); setIsPlaying(true); setCurrentTime(0); }} currentSongId={currentSong?.id} />
      <Player currentSong={currentSong} isPlaying={isPlaying} currentTime={currentTime} onPlayPause={setIsPlaying} onSeek={setCurrentTime} />
    </div>
  );
};

export default App;
