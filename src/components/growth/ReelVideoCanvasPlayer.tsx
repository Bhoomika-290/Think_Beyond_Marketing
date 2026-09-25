import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Download, 
  Sparkles, 
  Send, 
  Check, 
  CheckCircle2
} from 'lucide-react';
import type { VisualReelConcept, StoryboardFrame } from '../../types/growth';

interface ReelVideoCanvasPlayerProps {
  reel: VisualReelConcept;
  onUpdateReel: (updatedReel: VisualReelConcept) => void;
  ventureName: string;
}

export const ReelVideoCanvasPlayer: React.FC<ReelVideoCanvasPlayerProps> = ({
  reel,
  onUpdateReel,
  ventureName,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [agentPrompt, setAgentPrompt] = useState<string>('');
  const [agentHistory, setAgentHistory] = useState<VisualReelConcept[]>([]);
  const [agentFeedback, setAgentFeedback] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const durationSec = reel.durationSeconds || 24;

  // Determine active frame based on current time
  const activeFrameIndex = useMemo(() => {
    const idx = reel.frames.findIndex((f) => currentTimeSec >= f.startTimeSec && currentTimeSec < f.endTimeSec);
    return idx !== -1 ? idx : Math.max(0, reel.frames.length - 1);
  }, [currentTimeSec, reel.frames]);

  const activeFrame: StoryboardFrame = reel.frames[activeFrameIndex] || reel.frames[0];

  // 60FPS Playback loop
  useEffect(() => {
    const updatePlayback = (now: number) => {
      const deltaSec = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        setCurrentTimeSec((prev) => {
          const next = prev + deltaSec;
          if (next >= durationSec) {
            return 0; // loop
          }
          return next;
        });
      }

      animationFrameRef.current = requestAnimationFrame(updatePlayback);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(updatePlayback);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, durationSec]);

  // Dynamic canvas motion rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear frame
    ctx.clearRect(0, 0, width, height);

    // Frame progress within current scene (0 to 1)
    const sceneDuration = (activeFrame.endTimeSec - activeFrame.startTimeSec) || 4;
    const sceneProgress = Math.min(1, Math.max(0, (currentTimeSec - activeFrame.startTimeSec) / sceneDuration));

    // Dynamic color tokens
    const primaryColor = reel.brandColorPrimary || '#4D8DFF';
    const accentColor = reel.brandColorAccent || '#10B981';
    const isSaaS = reel.productType.toLowerCase().includes('saas') || reel.productType.toLowerCase().includes('software');

    // 1. Dynamic Background gradient with subtle pulse
    const bgGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
    bgGrad.addColorStop(0, '#06090E');
    bgGrad.addColorStop(0.5, '#0C121D');
    bgGrad.addColorStop(1, '#05070B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ambient Lighting Glow Orbs
    const glowGrad = ctx.createRadialGradient(
      width * 0.5 + Math.sin(currentTimeSec * 1.5) * 40,
      height * 0.45 + Math.cos(currentTimeSec * 1.2) * 50,
      10,
      width * 0.5,
      height * 0.45,
      width * 0.7
    );
    glowGrad.addColorStop(0, `${primaryColor}33`);
    glowGrad.addColorStop(0.6, `${accentColor}15`);
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Motion Transforms (Camera push-in, pan, zoom)
    ctx.save();
    let scale = 1;
    let translateX = 0;
    let translateY = 0;

    switch (activeFrame.motionType) {
      case 'push_in':
        scale = 1 + sceneProgress * 0.15;
        translateY = -sceneProgress * 20;
        break;
      case 'pan_right':
        scale = 1.05;
        translateX = -40 + sceneProgress * 80;
        break;
      case 'orbit_zoom':
        scale = 1.1 - Math.sin(sceneProgress * Math.PI) * 0.12;
        translateX = Math.sin(sceneProgress * Math.PI * 2) * 20;
        break;
      case 'macro_focus':
        scale = 1.25 + sceneProgress * 0.1;
        break;
      case 'kinetic_glitch':
        scale = 1.0 + (Math.random() > 0.9 ? 0.04 : 0);
        translateX = (Math.random() > 0.9 ? (Math.random() - 0.5) * 8 : 0);
        break;
      case 'split_reveal':
        scale = 1.08;
        translateY = 20 - sceneProgress * 30;
        break;
    }

    ctx.translate(width / 2 + translateX, height * 0.46 + translateY);
    ctx.scale(scale, scale);
    ctx.translate(-width / 2, -height * 0.46);

    // 4. Center Hero Graphic Rendering (SaaS UI Mockup OR Physical CAD Model)
    if (isSaaS) {
      // Draw High-Tech SaaS Interface Mockup
      const uiW = width * 0.84;
      const uiH = height * 0.42;
      const uiX = (width - uiW) / 2;
      const uiY = height * 0.28;

      // Card shadow
      ctx.shadowColor = `${primaryColor}55`;
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#0E1624';
      ctx.beginPath();
      ctx.roundRect(uiX, uiY, uiW, uiH, 16);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Border
      ctx.strokeStyle = '#263447';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Top UI App Bar
      ctx.fillStyle = '#152030';
      ctx.beginPath();
      ctx.roundRect(uiX, uiY, uiW, 36, [16, 16, 0, 0]);
      ctx.fill();

      // Window controls dots
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(uiX + 16, uiY + 18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(uiX + 28, uiY + 18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(uiX + 40, uiY + 18, 4, 0, Math.PI * 2);
      ctx.fill();

      // App Title in UI bar
      ctx.fillStyle = '#AAB4C3';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`${ventureName.toUpperCase()} // WORKSPACE`, uiX + 60, uiY + 22);

      // Left Mini Sidebar
      ctx.fillStyle = '#101926';
      ctx.fillRect(uiX, uiY + 36, 44, uiH - 36);

      // Main Dashboard Area: Animated Metric Cards & Sparkline
      ctx.fillStyle = '#182436';
      ctx.beginPath();
      ctx.roundRect(uiX + 54, uiY + 48, (uiW - 68) * 0.48, 52, 8);
      ctx.fill();

      ctx.fillStyle = '#738095';
      ctx.font = '9px monospace';
      ctx.fillText('VELOCITY INDEX', uiX + 62, uiY + 64);
      ctx.fillStyle = '#34D399';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('+98.4%', uiX + 62, uiY + 86);

      ctx.fillStyle = '#182436';
      ctx.beginPath();
      ctx.roundRect(uiX + 54 + (uiW - 68) * 0.52, uiY + 48, (uiW - 68) * 0.48, 52, 8);
      ctx.fill();

      ctx.fillStyle = '#738095';
      ctx.font = '9px monospace';
      ctx.fillText('TELEMETRY STATUS', uiX + 62 + (uiW - 68) * 0.52, uiY + 64);
      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 16px monospace';
      ctx.fillText('ACTIVE', uiX + 62 + (uiW - 68) * 0.52, uiY + 86);

      // Live Animated Spline Chart inside UI
      const chartX = uiX + 54;
      const chartY = uiY + 112;
      const chartW = uiW - 68;
      const chartH = uiH - 126;

      ctx.fillStyle = '#111A28';
      ctx.beginPath();
      ctx.roundRect(chartX, chartY, chartW, chartH, 8);
      ctx.fill();

      // Draw animated curve
      ctx.beginPath();
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      const points = [0.2, 0.4, 0.35, 0.7, 0.55, 0.85, 0.95];
      for (let i = 0; i < points.length; i++) {
        const px = chartX + 12 + (i / (points.length - 1)) * (chartW - 24);
        const dynamicOffset = Math.sin(currentTimeSec * 3 + i) * 8;
        const py = chartY + chartH - 14 - points[i] * (chartH - 28) + dynamicOffset;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Animated Cursor pointer moving across dashboard
      const cursorX = uiX + 110 + Math.sin(currentTimeSec * 2) * 60;
      const cursorY = uiY + 130 + Math.cos(currentTimeSec * 2.5) * 30;

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(cursorX, cursorY);
      ctx.lineTo(cursorX + 12, cursorY + 12);
      ctx.lineTo(cursorX + 5, cursorY + 14);
      ctx.lineTo(cursorX + 2, cursorY + 20);
      ctx.closePath();
      ctx.fill();
    } else {
      // Draw Cinematic Physical / Hardware 3D Product Representation
      const centerX = width / 2;
      const centerY = height * 0.46;
      const rot = currentTimeSec * 1.2;

      // Outer Specular Rings
      ctx.strokeStyle = `${primaryColor}44`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 80, 140, 40, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Product Silhouette
      ctx.shadowColor = `${primaryColor}88`;
      ctx.shadowBlur = 40;
      const prodGrad = ctx.createLinearGradient(centerX - 80, centerY - 100, centerX + 80, centerY + 100);
      prodGrad.addColorStop(0, '#E2E8F0');
      prodGrad.addColorStop(0.5, '#1E293B');
      prodGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = prodGrad;

      ctx.beginPath();
      ctx.roundRect(centerX - 70 + Math.sin(rot) * 10, centerY - 90, 140, 170, 24);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Specular Highlight Edge
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dynamic Sensor / Core Emblem
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(centerX + Math.sin(rot) * 10, centerY - 10, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#080B10';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ventureName.slice(0, 3).toUpperCase(), centerX + Math.sin(rot) * 10, centerY - 6);
      ctx.textAlign = 'left';
    }

    ctx.restore();

    // 5. Kinetic Overlay Elements (Grid, HUD markers)
    ctx.strokeStyle = '#26344733';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(width - 30, 80);
    ctx.moveTo(30, height - 120);
    ctx.lineTo(width - 30, height - 120);
    ctx.stroke();

    // Sound wave / Audio pulse animation on canvas
    if (!isMuted) {
      ctx.fillStyle = `${accentColor}88`;
      for (let i = 0; i < 18; i++) {
        const barH = 4 + Math.abs(Math.sin(currentTimeSec * 8 + i * 0.8)) * 18;
        ctx.fillRect(width - 70 + i * 3, 48 - barH / 2, 2, barH);
      }
    }
  }, [currentTimeSec, activeFrame, reel, ventureName, isMuted]);

  // Agent Video Editing handler
  const handleApplyAgentEdit = (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToUse = customPrompt || agentPrompt;
    if (!promptToUse.trim()) return;

    // Save history for undo
    setAgentHistory([...agentHistory, JSON.parse(JSON.stringify(reel))]);

    const promptLower = promptToUse.toLowerCase();
    const updatedReel = { ...reel };

    if (promptLower.includes('hook') || promptLower.includes('opening') || promptLower.includes('punchier')) {
      updatedReel.hookHeadline = `STOP SETTLING: Meet ${ventureName}`;
      if (updatedReel.frames[0]) {
        updatedReel.frames[0].kineticHeadline = 'STOP GUESSING.';
        updatedReel.frames[0].onScreenText = `Why settle for legacy friction?`;
        updatedReel.frames[0].motionType = 'kinetic_glitch';
      }
      setAgentFeedback('Refined hook to high-impact kinetic punch-in.');
    } else if (promptLower.includes('15') || promptLower.includes('short')) {
      updatedReel.durationSeconds = 15;
      updatedReel.frames = updatedReel.frames.slice(0, 3).map((f, i) => ({
        ...f,
        startTimeSec: i * 5,
        endTimeSec: (i + 1) * 5,
      }));
      setAgentFeedback('Paced reel to high-velocity 15s format.');
    } else if (promptLower.includes('minimal') || promptLower.includes('premium')) {
      updatedReel.audioTrackVibe = 'Deep tactile Foley with pure sub-bass pulse';
      updatedReel.frames = updatedReel.frames.map((f) => ({
        ...f,
        motionType: 'macro_focus',
      }));
      setAgentFeedback('Configured macro focus cinematic transitions.');
    } else if (promptLower.includes('cta') || promptLower.includes('action')) {
      updatedReel.ctaText = 'Claim Launch Allocation';
      const last = updatedReel.frames[updatedReel.frames.length - 1];
      if (last) {
        last.kineticHeadline = 'CLAIM YOUR ACCESS.';
        last.onScreenText = 'Batch 01 Open • Link in Bio';
      }
      setAgentFeedback('Updated closing call-to-action overlay.');
    } else {
      updatedReel.hookHeadline = `${ventureName}: Engineered Without Compromise`;
      if (updatedReel.frames[0]) {
        updatedReel.frames[0].kineticHeadline = promptToUse.slice(0, 24).toUpperCase();
      }
      setAgentFeedback(`Applied custom creative transformation.`);
    }

    onUpdateReel(updatedReel);
    setAgentPrompt('');
    setTimeout(() => setAgentFeedback(null), 4000);
  };

  const handleUndo = () => {
    if (agentHistory.length === 0) return;
    const previous = agentHistory[agentHistory.length - 1];
    setAgentHistory(agentHistory.slice(0, -1));
    onUpdateReel(previous);
    setAgentFeedback('Reverted to previous creative revision.');
    setTimeout(() => setAgentFeedback(null), 3000);
  };

  const handleExportReel = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Generate Canvas Frame Snapshot download
      const canvas = canvasRef.current;
      if (canvas) {
        const imageUri = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${ventureName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-reel-master.png`;
        link.href = imageUri;
        link.click();
      }
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 800);
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const ms = Math.floor((secs % 1) * 10);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}.${ms}`;
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* 1. Main Reel Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-[#263244] shadow-xl">
        {/* Left Column: 9:16 Social Reel Viewport */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
          <div className="w-full max-w-[340px] aspect-[9/16] relative rounded-[28px] bg-black border-4 border-[#1E293B] shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* 60FPS Canvas Layer */}
            <canvas
              ref={canvasRef}
              width={360}
              height={640}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Floating Top Reel Status Bar */}
            <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#4D8DFF] flex items-center justify-center font-mono text-[10px] font-bold text-[#080B10] shadow-md">
                  {ventureName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide truncate max-w-[120px]">
                    {ventureName}
                  </div>
                  <div className="text-[9px] font-mono text-[#34D399] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                    SPONSORED REEL
                  </div>
                </div>
              </div>

              {/* Sound / Volume Indicator */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#38BDF8]" />}
              </button>
            </div>

            {/* Kinetic Headline Reveal (Upper Third) */}
            <div className="relative z-10 px-5 pt-1 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-black text-white tracking-wider shadow-lg animate-fadeIn">
                {activeFrame.kineticHeadline}
              </span>
            </div>

            {/* Lower-Third Story & Interactive CTA Layer */}
            <div className="relative z-10 p-5 space-y-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
              {/* Feature Pill Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-[#4D8DFF]/20 border border-[#4D8DFF]/40 text-[10px] font-mono font-bold text-[#60A5FA]">
                  {activeFrame.featureHighlight || ventureName}
                </span>
                <span className="text-[9px] font-mono text-[#738095] bg-black/50 px-2 py-0.5 rounded border border-white/10">
                  {formatTime(currentTimeSec)} / {formatTime(durationSec)}
                </span>
              </div>

              {/* Kinetic Body Copy */}
              <div className="text-xs font-semibold text-white leading-snug drop-shadow-md">
                {activeFrame.onScreenText}
              </div>

              {/* Final Frame CTA Button or Swipe Cue */}
              {activeFrameIndex === reel.frames.length - 1 ? (
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#38BDF8] text-[#080B10] font-mono text-xs font-extrabold shadow-lg shadow-[#4D8DFF]/30 tracking-wider flex items-center justify-center gap-1.5 animate-pulse"
                >
                  <span>{reel.ctaText}</span>
                  <span>→</span>
                </button>
              ) : (
                <div className="w-full bg-white/10 backdrop-blur-md py-1.5 rounded-lg text-center text-[10px] font-mono text-[#AAB4C3] border border-white/10">
                  VO: &ldquo;{activeFrame.voiceoverOrAudio}&rdquo;
                </div>
              )}

              {/* Scene Progress Timeline Bar */}
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#38BDF8] transition-all duration-100 rounded-full"
                  style={{ width: `${(currentTimeSec / durationSec) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[340px]">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Reel'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTimeSec(0)}
              className="p-2 rounded-xl bg-[#111823] hover:bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244] transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleExportReel}
              disabled={isExporting}
              className="px-3 py-2 rounded-xl bg-[#111823] hover:bg-[#1A2536] text-[#34D399] font-mono text-xs font-bold flex items-center gap-1.5 border border-[#10B981]/40 transition-colors"
            >
              {exportSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isExporting ? 'Exporting...' : exportSuccess ? 'Exported!' : 'Export Reel'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Timeline & Creative Editing Agent */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Reel Header & Audio Meta */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#8B5CF6]/20 text-[#A78BFA]">
                  {reel.durationSeconds}s SOCIAL REEL
                </span>
                <span className="text-xs font-bold text-white truncate">{reel.title}</span>
              </div>
              <div className="text-[11px] text-[#38BDF8] italic mt-0.5">
                Hook: &ldquo;{reel.hookHeadline}&rdquo;
              </div>
            </div>

            <div className="text-[10px] font-mono text-[#738095] bg-[#0D121B] px-2.5 py-1 rounded border border-[#263244] shrink-0">
              Audio: {reel.audioTrackVibe}
            </div>
          </div>

          {/* Visual Scene Timeline Stepper */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
              <span>Scene Timeline ({reel.frames.length} Scenes)</span>
              <span className="text-[10px] text-[#738095]">Click thumbnail to seek</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {reel.frames.map((frame, idx) => {
                const isCurrent = activeFrameIndex === idx;

                return (
                  <div
                    key={frame.frameNumber}
                    onClick={() => {
                      setCurrentTimeSec(frame.startTimeSec);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      isCurrent
                        ? 'bg-[#151E2B] border-[#8B5CF6] ring-2 ring-[#8B5CF6]/40 shadow-lg'
                        : 'bg-[#111823] border-[#263244] hover:border-[#384860]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#738095]">
                        <span className="font-bold text-[#A78BFA]">0{frame.frameNumber}</span>
                        <span>{frame.timestamp}</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">{frame.kineticHeadline}</div>
                      <p className="text-[10px] text-[#AAB4C3] leading-snug line-clamp-2">{frame.visualDirection}</p>
                    </div>

                    <div className="pt-1.5 border-t border-[#1A2536] flex items-center justify-between text-[9px] font-mono text-[#738095]">
                      <span className="uppercase text-[#38BDF8]">{frame.motionType.replace('_', ' ')}</span>
                      {isCurrent && <span className="text-[#10B981] font-bold">PLAYING</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Modifier Action Pills */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-[#738095] uppercase font-bold">
              Quick Creative Modifiers:
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleApplyAgentEdit(undefined, 'Make the opening hook punchier')}
                className="px-2.5 py-1 rounded-lg bg-[#111823] hover:bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244] transition-colors"
              >
                ⚡ Punchier Hook
              </button>
              <button
                type="button"
                onClick={() => handleApplyAgentEdit(undefined, 'Make it 15 seconds short')}
                className="px-2.5 py-1 rounded-lg bg-[#111823] hover:bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244] transition-colors"
              >
                ⏱ 15s High-Velocity
              </button>
              <button
                type="button"
                onClick={() => handleApplyAgentEdit(undefined, 'Make tone ultra minimal and premium')}
                className="px-2.5 py-1 rounded-lg bg-[#111823] hover:bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244] transition-colors"
              >
                💎 Ultra-Minimal
              </button>
              <button
                type="button"
                onClick={() => handleApplyAgentEdit(undefined, 'Update closing CTA')}
                className="px-2.5 py-1 rounded-lg bg-[#111823] hover:bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244] transition-colors"
              >
                🎯 Refine CTA
              </button>
            </div>
          </div>

          {/* Creative Editing Agent Interactive Form */}
          <form onSubmit={(e) => handleApplyAgentEdit(e)} className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-[#8B5CF6] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Creative Video Editing Agent
              </span>
              {agentHistory.length > 0 && (
                <button
                  type="button"
                  onClick={handleUndo}
                  className="text-[#F59E0B] hover:underline"
                >
                  Undo Edit
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Tell the creative agent what to change in the video (e.g. 'Make opening more dramatic', 'Change CTA')..."
                value={agentPrompt}
                onChange={(e) => setAgentPrompt(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-[#0D121B] border border-[#263244] text-xs text-white placeholder-[#738095]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shrink-0 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply</span>
              </button>
            </div>

            {agentFeedback && (
              <div className="text-[10px] font-mono text-[#34D399] animate-fadeIn flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{agentFeedback}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
