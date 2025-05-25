import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Phone, Calendar, Clock, Users, Music, VolumeX } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Index = () => {
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [attendees, setAttendees] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventDate = new Date("May 28, 2025 07:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/yayaw.mp3");
    audioRef.current.loop = true;
    
    // Countdown timer
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    // Animation on scroll
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Only observe elements after component mounts
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
      });
    }, 100);
    
    return () => {
      clearInterval(timer);
      observer.disconnect();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [isRSVPSubmitted]);
  
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendees) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon isi nama dan jumlah tamu yang hadir",
        variant: "destructive",
      });
      return;
    }
    
    setIsRSVPSubmitted(true);
    // Try to play music when form is submitted
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      setIsMusicPlaying(true);
    }
    
    toast({
      title: "Selamat Datang!",
      description: `Terima kasih ${name}, kami menantikan kehadiran Anda`,
    });
  };

  const openMap = () => {
    window.open("https://maps.google.com/?q=Jl. Siaga No.9, RT.9/RW.6, Kb. Kosong, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10630", "_blank");
  };

  const rundownData = [
    { 
      waktu: "05.00 – 06.00", 
      deskripsi: "Persiapan tempat dan perlengkapan", 
      area: "📍 Lapangan & Multimedia" 
    },
    { 
      waktu: "06.00 – 06.30", 
      deskripsi: "Persiapan panitia dan MC", 
      area: "📍 Lapangan & Multimedia" 
    },
    { 
      waktu: "06.30 – 07.30", 
      deskripsi: "Sterilisasi lokasi & Tarian Pembuka", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "07.30 – 08.42", 
      deskripsi: "Pembukaan, doa, menyanyikan lagu Indonesia Raya, dan sambutan", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "08.42 – 08.55", 
      deskripsi: "Sejarah Jakarta & Pembukaan Drama", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "08.55 – 09.37", 
      deskripsi: "Pertunjukan Drama & Tarian", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "09.37 – 09.57", 
      deskripsi: "Apresiasi & Pengarahan Fashion Show", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "09.57 – 10.27", 
      deskripsi: "Fashion Show per kelas", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "10.27 – 10.47", 
      deskripsi: "Penutupan, Flashmob, dan pengarahan sesi foto", 
      area: "📍 Lapangan" 
    },
    { 
      waktu: "10.47 – 11.52", 
      deskripsi: "Sesi Foto: Kepala Sekolah, Guru, dan Kelas", 
      area: "📍 Ruang Multimedia" 
    },
    { 
      waktu: "11.52 – 12.00", 
      deskripsi: "Pengarahan istirahat", 
      area: "📍 Lapangan" 
    }
  ];

  const galleryImages = [
    "/lovable-uploads/ab32a466-386c-44a9-afb4-6dbcb360f6b8.png",
    "/lovable-uploads/ff618e06-aa6c-48dc-8415-103bca71af41.png",
    "/lovable-uploads/8c185fe0-11f1-470e-9669-f3c4eb765434.png",
    "/lovable-uploads/cb3de004-ad31-4aa8-a8a3-d9abfe8044da.png"
  ];

  return (
    <div className="min-h-screen bg-[#fff8f8] text-gray-900 relative overflow-x-hidden">
      {/* Background batik pattern with parallax */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/batik-pattern.svg')] opacity-5 parallax-bg z-0"></div>
      
      {/* Music player button - always visible */}
      <button 
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-[#800000] shadow-lg hover:bg-[#600000] transition-all pulse-btn"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Matikan musik" : "Putar musik"}
      >
        {isMusicPlaying ? <VolumeX className="text-white" size={24} /> : <Music className="text-white" size={24} />}
      </button>
      
      {!isRSVPSubmitted ? (
        /* RSVP Form Page */
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
          <div className="animate-on-scroll parallax-slow">
            <div className="font-bold text-4xl md:text-5xl lg:text-6xl mb-8 text-center text-[#800000] drop-shadow-md">
              Undangan P5 
              <span className="block mt-2">SMKN 21 Jakarta</span>
            </div>
            
            <Card className="w-full max-w-md border-0 rounded-2xl enhanced-shadow backdrop-blur-sm bg-white/90 hover-card">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-[#800000]">RSVP</h2>
                    <p className="text-gray-600">Mohon isi data kehadiran</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#800000]">Nama</Label>
                      <Input 
                        id="name" 
                        placeholder="Masukkan nama Anda" 
                        className="rounded-xl border-gray-300 focus:border-[#800000] focus:ring-[#800000]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="attendees" className="text-[#800000]">Jumlah Tamu</Label>
                      <Input 
                        id="attendees" 
                        type="number" 
                        min="1"
                        placeholder="Jumlah yang hadir" 
                        className="rounded-xl border-gray-300 focus:border-[#800000] focus:ring-[#800000]"
                        value={attendees}
                        onChange={(e) => setAttendees(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full rounded-xl py-6 text-lg bg-[#800000] hover:bg-[#600000] shadow-[0_4px_12px_rgba(128,0,0,0.3)] transition-all duration-300 hover:shadow-[0_6px_16px_rgba(128,0,0,0.4)]"
                  >
                    Buka Undangan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Main Invitation Page */
        <div className="container mx-auto px-4 py-10 relative z-10">
          <header className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#800000]">
              Acara P5 Kearifan Lokal
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">SMKN 21 Jakarta</p>
            <div className="w-24 h-1 bg-[#800000] mx-auto mt-6"></div>
          </header>

          {/* Countdown Timer */}
          <section className="mb-20 animate-on-scroll">
            <div className="rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(128,0,0,0.35)] bg-gradient-to-br from-[#800000] to-[#5a0000] p-1 hover-card">
              <div className="rounded-xl bg-white/95 p-8">
                <h2 className="text-2xl font-bold text-center text-[#800000] mb-6">Acara Akan Dimulai</h2>
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#800000]">{timeLeft.days}</div>
                    <div className="text-gray-600">Hari</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#800000]">{timeLeft.hours}</div>
                    <div className="text-gray-600">Jam</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#800000]">{timeLeft.minutes}</div>
                    <div className="text-gray-600">Menit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#800000]">{timeLeft.seconds}</div>
                    <div className="text-gray-600">Detik</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Event Details */}
          <section className="mb-20 grid md:grid-cols-2 gap-8">
            <div className="animate-on-scroll">
              <Card className="h-full border-0 rounded-2xl overflow-hidden enhanced-shadow backdrop-blur-sm bg-white/90 hover-card">
                <CardContent className="p-0">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#800000] mb-6">Informasi Acara</h2>
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <Calendar className="w-6 h-6 mr-4 text-[#800000]" />
                        <div>
                          <div className="font-medium">Tanggal</div>
                          <div className="text-lg">28 Mei 2025</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-6 h-6 mr-4 text-[#800000]" />
                        <div>
                          <div className="font-medium">Waktu</div>
                          <div className="text-lg">07:00 WIB</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-6 h-6 mr-4 text-[#800000] flex-shrink-0" />
                        <div>
                          <div className="font-medium">Lokasi</div>
                          <div className="text-lg">Jl. Siaga No.9, RT.9/RW.6, Kb. Kosong, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10630</div>
                          <Button 
                            onClick={openMap} 
                            variant="outline" 
                            className="mt-2 border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white transition-colors rounded-xl"
                          >
                            Buka di Google Maps
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-6 h-6 mr-4 text-[#800000]" />
                        <div>
                          <div className="font-medium">Kontak Person</div>
                          <div className="text-lg">+62 881-0254-68121</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-6 h-6 mr-4 text-[#800000]" />
                        <div>
                          <div className="font-medium">Kehadiran</div>
                          <div className="text-lg">{name} ({attendees} orang)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-on-scroll">
              <Card className="h-full border-0 rounded-2xl overflow-hidden enhanced-shadow backdrop-blur-sm bg-white/90 hover-card">
                <CardContent className="p-0">
                  <div className="bg-[#800000] p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Lokasi</h2>
                    <p className="text-white/80">SMKN 21 Jakarta</p>
                  </div>
                  <AspectRatio ratio={16/9}>
                    <div className="w-full h-full">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7292631235444!2d106.84712557582348!3d-6.166319193827786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5a964b52413%3A0x2c67b0ef3bf56c01!2sJl.%20Siaga%20No.9%2C%20RT.9%2FRW.6%2C%20Kb.%20Kosong%2C%20Kec.%20Kemayoran%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010630!5e0!3m2!1sid!2sid!4v1715701544555!5m2!1sid!2sid"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                      </iframe>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Rundown */}
          <section className="mb-20 animate-on-scroll">
            <Card className="border-0 rounded-2xl overflow-hidden enhanced-shadow backdrop-blur-sm bg-white/90 hover-card">
              <CardContent className="p-6 overflow-x-auto">
                <h2 className="text-2xl font-bold text-[#800000] mb-6 flex items-center">
                  🗓 Rundown Acara Kegiatan
                </h2>
                <div className="space-y-4">
                  {rundownData.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#800000]/20"
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="font-bold text-[#800000] text-lg">{item.waktu}</div>
                        <div className="text-gray-800 font-medium">{item.deskripsi}</div>
                        <div className="text-gray-600 text-sm">{item.area}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Gallery */}
          <section className="mb-20 animate-on-scroll">
            <h2 className="text-2xl font-bold text-center text-[#800000] mb-8">Galeri Dokumentasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden enhanced-shadow transform transition-transform hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(128,0,0,0.4)]">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={image} 
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8 animate-on-scroll">
            <div className="w-16 h-1 bg-[#800000] mx-auto mb-6"></div>
            <p className="text-gray-600">Kami menantikan kehadiran Anda</p>
            <h2 className="text-2xl font-bold text-[#800000] mt-2">Acara P5 Kearifan Lokal</h2>
            <p className="mt-6 text-gray-500">© 2025 SMKN 21 Jakarta</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
