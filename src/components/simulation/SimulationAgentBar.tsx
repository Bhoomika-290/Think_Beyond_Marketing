import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Mic, 
  MicOff, 
  Undo2,
  AlertCircle
} from 'lucide-react';
import type { 
  UserModificationState, 
  SoftwareModificationState,
  PhysicalCategoryType 
} from '../../types/simulation';

// TypeScript declaration for Web Speech API
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

interface SimulationAgentBarProps {
  mode?: 'physical' | 'software';
  activeStageIndex?: number;
  stageName?: string;
  categoryType?: PhysicalCategoryType;
  
  // Physical mode props
  currentOverrides?: UserModificationState;
  onApplyOverrides?: (overrides: UserModificationState) => void;
  onResetOverrides?: () => void;

  // Software mode props
  softwareOverrides?: SoftwareModificationState;
  onApplySoftwareOverrides?: (overrides: SoftwareModificationState) => void;
  onResetSoftwareOverrides?: () => void;
  softwareArchetype?: string;
  softwareScreenTitle?: string;
}

export const SimulationAgentBar: React.FC<SimulationAgentBarProps> = ({
  mode = 'physical',
  activeStageIndex = 0,
  stageName = 'Stage',
  categoryType = 'general_goods',
  currentOverrides = {},
  onApplyOverrides,
  onResetOverrides,
  softwareOverrides = {},
  onApplySoftwareOverrides,
  onResetSoftwareOverrides,
  softwareScreenTitle = 'Interactive Workspace',
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  
  // Voice input state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Undo history stack
  const [physicalHistory, setPhysicalHistory] = useState<UserModificationState[]>([]);
  const [softwareHistory, setSoftwareHistory] = useState<SoftwareModificationState[]>([]);

  // Setup Web Speech API if supported in browser
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setPrompt(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError(`Voice error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    const win = window as unknown as IWindow;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      setSpeechError('Speech recognition is not supported in this browser. Please type your instruction.');
      setTimeout(() => setSpeechError(null), 5000);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        setSpeechError(null);
        recognitionRef.current?.start();
      } catch {
        setSpeechError('Microphone permission required or speech recognition busy.');
      }
    }
  };

  // Dynamic quick suggestions based on active mode & context
  const getSuggestions = () => {
    if (mode === 'software') {
      return [
        'Replace this attribution chart with a conversion funnel',
        'Add a campaign comparison table below this',
        'Make this dashboard more minimal',
        'Remove this KPI card',
        'Highlight high-confidence anomalies',
        'Switch to dark mode',
      ];
    }

    switch (activeStageIndex) {
      case 0: // Package / Arrival
        return [
          'Change packaging to luxury matte black rigid case',
          'Switch to unbleached kraft craft box',
          'Use wooden presentation box',
          'Use brushed aluminum flight case',
        ];
      case 1: // Unbox
        return [
          'Elevate unboxing reveal trajectory',
          'Add gold foil provenance seal',
          'Use velvet-lined cradle insert',
        ];
      case 2: // Reveal
        return [
          'Make casing matte obsidian black',
          'Switch to brushed aerospace titanium',
          'Change accent to emerald green',
          'Apply high-gloss ceramic finish',
          'Make the product 20% smaller',
        ];
      case 3: // Materials / Exploded
        return [
          'Expand exploded separation for deep inspection',
          'Highlight carbon fiber shell layers',
          'Show internal gold PCB traces',
          'Expose high-density battery pack',
        ];
      case 4: // Activation
        if (categoryType === 'hardware') {
          return [
            'Snap magnetic fast-charging dock',
            'Show USB-C cable connection',
            'Pulse cyan telemetry waveform on display',
            'Remove status LED',
          ];
        } else if (categoryType === 'apparel') {
          return [
            'Simulate heavy water droplet weather stress',
            'Activate thermal microclimate heat barrier',
            'Test storm collar wind deflection',
          ];
        } else if (categoryType === 'coffee') {
          return [
            'Vent intense aromatic steam from one-way valve',
            'Simulate roasted bean extraction cascade',
            'Show airtight nitrogen seal lock',
          ];
        }
        return [
          'Trigger precision mechanical actuator stroke',
          'Activate high-power functional mode',
        ];
      case 5: // Field Use
        return [
          'Put the product in a workshop',
          'Switch environment to alpine outdoor stone',
          'Set backdrop to modern workstation desk',
          'Set scene to rustic artisan cafe counter',
          'Put this on an outdoor construction site',
        ];
      case 6: // Outcome
      default:
        return [
          'Set dramatic commercial rim lighting',
          'Add warm champagne gold highlight aura',
          'Increase cinematic orbit speed',
        ];
    }
  };

  const handleInterpretAndApply = (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;

    setIsProcessing(true);
    const p = inputPrompt.toLowerCase();

    if (mode === 'software') {
      // -----------------------------------------------------------------------
      // SOFTWARE PROTOTYPE INTERPRETATION
      // -----------------------------------------------------------------------
      setSoftwareHistory((prev) => [...prev, { ...softwareOverrides }]);
      const updated: SoftwareModificationState = { 
        ...softwareOverrides,
        hiddenMetricLabels: [...(softwareOverrides.hiddenMetricLabels || [])]
      };
      let actionDesc = '';

      if (p.includes('funnel') || p.includes('conversion funnel')) {
        updated.chartTypeOverride = 'funnel';
        actionDesc += 'Transformed attribution chart into a Multi-Stage Conversion Funnel. ';
      } else if (p.includes('attribution') || p.includes('multi-touch') || p.includes('channel')) {
        updated.chartTypeOverride = 'attribution';
        actionDesc += 'Restored Multi-Touch Attribution chart view. ';
      } else if (p.includes('timeseries') || p.includes('trend') || p.includes('line chart')) {
        updated.chartTypeOverride = 'timeseries';
        actionDesc += 'Switched to 30-Day Trendline time-series view. ';
      }

      if (p.includes('comparison table') || p.includes('campaign table') || p.includes('add table')) {
        updated.showComparisonTable = true;
        actionDesc += 'Added Cross-Channel Campaign Performance Table below workspace. ';
      } else if (p.includes('hide table') || p.includes('remove table')) {
        updated.showComparisonTable = false;
        actionDesc += 'Removed comparison table. ';
      }

      if (p.includes('minimal') || p.includes('compact') || p.includes('cleaner')) {
        updated.layoutDensity = 'minimal';
        actionDesc += 'Applied streamlined minimal dashboard density. ';
      } else if (p.includes('dense') || p.includes('expanded')) {
        updated.layoutDensity = 'dense';
        actionDesc += 'Applied high-density analytics layout. ';
      }

      if (p.includes('dark mode') || p.includes('dark theme')) {
        updated.themeOverride = 'dark';
        actionDesc += 'Enabled dark theme presentation. ';
      } else if (p.includes('light mode') || p.includes('light theme')) {
        updated.themeOverride = 'light';
        actionDesc += 'Enabled light theme presentation. ';
      }

      if (p.includes('remove kpi') || p.includes('remove card') || p.includes('remove this kpi') || p.includes('hide card')) {
        updated.hiddenMetricLabels = [...(updated.hiddenMetricLabels || []), 'CAC', 'Cost Per Acquisition'];
        actionDesc += 'Filtered out selected KPI metric card. ';
      }

      if (p.includes('anomaly') || p.includes('anomalies')) {
        updated.anomalyFilterActive = true;
        actionDesc += 'Isolated and highlighted high-confidence anomaly records. ';
      }

      if (!actionDesc) {
        actionDesc = `Applied simulated prototype modification: "${inputPrompt}".`;
        updated.customAutomationRule = inputPrompt;
      }

      updated.lastPromptApplied = inputPrompt;

      setTimeout(() => {
        onApplySoftwareOverrides?.(updated);
        setLastMessage(actionDesc);
        setIsProcessing(false);
        setPrompt('');
      }, 200);

    } else {
      // -----------------------------------------------------------------------
      // PHYSICAL 3D PRODUCT LAB INTERPRETATION
      // -----------------------------------------------------------------------
      setPhysicalHistory((prev) => [...prev, { ...currentOverrides }]);

      const updated: UserModificationState = { 
        ...currentOverrides,
        componentVisibility: { ...(currentOverrides.componentVisibility || {}) }
      };
      let actionDesc = '';

      // Color interpretations
      if (p.includes('black') || p.includes('obsidian') || p.includes('stealth') || p.includes('dark casing')) {
        updated.primaryColorOverride = '#0F172A';
        updated.materialOverride = 'matte_black';
        actionDesc += 'Set casing to Matte Obsidian Black. ';
      } else if (p.includes('titanium') || p.includes('silver') || p.includes('aluminum')) {
        updated.primaryColorOverride = '#E2E8F0';
        updated.materialOverride = 'brushed_titanium';
        actionDesc += 'Applied Brushed Aerospace Titanium. ';
      } else if (p.includes('steel') || p.includes('brushed steel')) {
        updated.primaryColorOverride = '#CBD5E1';
        updated.materialOverride = 'brushed_steel';
        actionDesc += 'Applied Brushed Stainless Steel finish. ';
      } else if (p.includes('ceramic') || p.includes('white casing')) {
        updated.primaryColorOverride = '#F8FAFC';
        updated.materialOverride = 'ceramic';
        actionDesc += 'Applied High-Gloss White Ceramic. ';
      }

      if (p.includes('emerald') || p.includes('green accent') || p.includes('green')) {
        updated.accentColorOverride = '#10B981';
        actionDesc += 'Accent changed to Emerald Green. ';
      } else if (p.includes('amber') || p.includes('orange accent') || p.includes('gold accent') || p.includes('gold')) {
        updated.accentColorOverride = '#F59E0B';
        actionDesc += 'Accent changed to Warm Amber Gold. ';
      } else if (p.includes('crimson') || p.includes('red accent') || p.includes('red')) {
        updated.accentColorOverride = '#EF4444';
        actionDesc += 'Accent changed to Crimson Red. ';
      } else if (p.includes('cyan') || p.includes('blue accent') || p.includes('cobalt')) {
        updated.accentColorOverride = '#06B6D4';
        actionDesc += 'Accent changed to Cyber Cyan. ';
      }

      // Material finish
      if (p.includes('carbon') || p.includes('carbon fiber')) {
        updated.materialOverride = 'carbon_fiber';
        updated.primaryColorOverride = '#18181B';
        actionDesc += 'Applied Carbon Fiber weave. ';
      } else if (p.includes('wood') || p.includes('timber')) {
        updated.materialOverride = 'wood';
        actionDesc += 'Applied Natural Woodgrain texture. ';
      } else if (p.includes('leather')) {
        updated.materialOverride = 'leather';
        actionDesc += 'Applied Full-Grain Leather finish. ';
      }

      // Scale changes
      if (p.includes('smaller') || p.includes('compact') || p.includes('reduce scale')) {
        updated.scaleOverride = 0.8;
        actionDesc += 'Scaled product form down to 80%. ';
      } else if (p.includes('larger') || p.includes('bigger') || p.includes('increase scale')) {
        updated.scaleOverride = 1.2;
        actionDesc += 'Scaled product form up to 120%. ';
      }

      // Component visibility
      if (p.includes('remove led') || p.includes('hide led') || p.includes('without led')) {
        updated.componentVisibility!.led = false;
        actionDesc += 'Removed status LED aperture. ';
      } else if (p.includes('show led') || p.includes('add led')) {
        updated.componentVisibility!.led = true;
        actionDesc += 'Restored status LED. ';
      }

      if (p.includes('show internal pcb') || p.includes('expose pcb') || p.includes('show pcb') || p.includes('internal components')) {
        updated.componentVisibility!.pcb = true;
        updated.explodedSeparation = 1.8;
        actionDesc += 'Exposed internal PCB & micro-circuitry. ';
      }

      if (p.includes('show battery') || p.includes('expose battery')) {
        updated.componentVisibility!.battery = true;
        actionDesc += 'Exposed internal battery core. ';
      }

      // Exploded separation
      if (p.includes('explode') || p.includes('separation') || p.includes('expand layers')) {
        updated.explodedSeparation = 2.0;
        actionDesc += 'Maximized exploded layer separation. ';
      } else if (p.includes('collapse') || p.includes('assemble')) {
        updated.explodedSeparation = 0.4;
        actionDesc += 'Collapsed exploded layers. ';
      }

      // Activation modes
      if (p.includes('usb-c') || p.includes('usbc') || p.includes('cable')) {
        updated.activeFeatureMode = 'usbc';
        actionDesc += 'Configured USB-C tethered power connection. ';
      } else if (p.includes('dock') || p.includes('charging') || p.includes('magnetic dock')) {
        updated.activeFeatureMode = 'docking';
        actionDesc += 'Activated magnetic fast-charging dock. ';
      } else if (p.includes('telemetry') || p.includes('screen') || p.includes('waveform')) {
        updated.activeFeatureMode = 'telemetry';
        actionDesc += 'Illuminated active telemetry screen waveform. ';
      } else if (p.includes('water') || p.includes('rain') || p.includes('droplet')) {
        updated.activeFeatureMode = 'water_barrier';
        actionDesc += 'Initiated hydrophobic water droplet stress test. ';
      } else if (p.includes('steam') || p.includes('valve') || p.includes('aroma')) {
        updated.activeFeatureMode = 'steam_vent';
        actionDesc += 'Triggered aroma valve steam venting. ';
      }

      // Field environments
      if (p.includes('workshop') || p.includes('bench') || p.includes('factory')) {
        updated.environmentOverride = 'workshop';
        actionDesc += 'Transferred environment to Precision Workshop Bench. ';
      } else if (p.includes('construction') || p.includes('site') || p.includes('industrial site')) {
        updated.environmentOverride = 'construction';
        actionDesc += 'Transferred environment to Rugged Construction Site. ';
      } else if (p.includes('outdoor') || p.includes('mountain') || p.includes('nature') || p.includes('stone')) {
        updated.environmentOverride = 'outdoor';
        actionDesc += 'Transferred environment to Alpine Outdoor Stone. ';
      } else if (p.includes('desk') || p.includes('workstation') || p.includes('office')) {
        updated.environmentOverride = 'desk';
        actionDesc += 'Transferred environment to Modern Designer Workstation. ';
      } else if (p.includes('cafe') || p.includes('kitchen') || p.includes('counter')) {
        updated.environmentOverride = 'cafe';
        actionDesc += 'Transferred environment to Artisan Cafe Counter. ';
      } else if (p.includes('retail') || p.includes('store') || p.includes('showroom')) {
        updated.environmentOverride = 'retail';
        actionDesc += 'Transferred environment to Flagship Showroom Pedestal. ';
      }

      // Packaging
      if (p.includes('wooden') || p.includes('wood box') || p.includes('wooden base')) {
        updated.packagingOverride = 'wooden_box';
        actionDesc += 'Set packaging to Artisan Handcrafted Wooden Box. ';
      } else if (p.includes('kraft') || p.includes('cardboard') || p.includes('unbleached')) {
        updated.packagingOverride = 'kraft_box';
        actionDesc += 'Set packaging to Unbleached Kraft presentation box. ';
      } else if (p.includes('case') || p.includes('aluminum case') || p.includes('flight case')) {
        updated.packagingOverride = 'aluminum_case';
        actionDesc += 'Set packaging to CNC Anodized Aluminum Flight Case. ';
      } else if (p.includes('luxury') || p.includes('rigid') || p.includes('premium box')) {
        updated.packagingOverride = 'rigid_luxury';
        actionDesc += 'Set packaging to Luxury Rigid Architectural Box. ';
      }

      if (!actionDesc) {
        actionDesc = `Applied design modification: "${inputPrompt}".`;
        updated.accentColorOverride = '#4D8DFF';
      }

      updated.lastPromptApplied = inputPrompt;
      updated.targetStageIndex = activeStageIndex;

      setTimeout(() => {
        onApplyOverrides?.(updated);
        setLastMessage(actionDesc);
        setIsProcessing(false);
        setPrompt('');
      }, 200);
    }
  };

  const handleUndo = () => {
    if (mode === 'software') {
      if (softwareHistory.length === 0) return;
      const previous = softwareHistory[softwareHistory.length - 1];
      setSoftwareHistory((prev) => prev.slice(0, -1));
      onApplySoftwareOverrides?.(previous);
      setLastMessage('Reverted previous prototype change.');
    } else {
      if (physicalHistory.length === 0) return;
      const previous = physicalHistory[physicalHistory.length - 1];
      setPhysicalHistory((prev) => prev.slice(0, -1));
      onApplyOverrides?.(previous);
      setLastMessage('Reverted previous 3D scene change.');
    }
  };

  const hasPhysicalOverrides = Boolean(
    currentOverrides.primaryColorOverride ||
    currentOverrides.accentColorOverride ||
    currentOverrides.materialOverride ||
    currentOverrides.explodedSeparation ||
    currentOverrides.activeFeatureMode ||
    currentOverrides.environmentOverride ||
    currentOverrides.packagingOverride ||
    currentOverrides.scaleOverride ||
    (currentOverrides.componentVisibility && Object.keys(currentOverrides.componentVisibility).length > 0)
  );

  const hasSoftwareOverrides = Boolean(
    softwareOverrides.chartTypeOverride ||
    softwareOverrides.layoutDensity ||
    softwareOverrides.themeOverride ||
    softwareOverrides.showComparisonTable ||
    (softwareOverrides.hiddenMetricLabels && softwareOverrides.hiddenMetricLabels.length > 0) ||
    softwareOverrides.anomalyFilterActive ||
    softwareOverrides.customAutomationRule
  );

  const hasActiveOverrides = mode === 'software' ? hasSoftwareOverrides : hasPhysicalOverrides;

  const currentContextTitle = mode === 'software' 
    ? `Editing: Software Prototype — ${softwareScreenTitle}` 
    : `Editing: ${stageName}`;

  return (
    <div className="space-y-3">
      {/* 1. SINGLE-LINE AGENT MODIFICATION BAR */}
      <div className="bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] rounded-xl p-2 shadow-xl transition-all">
        {/* Context Bar Header */}
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#1E293B] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4D8DFF] animate-pulse" />
            <span className="text-[#93C5FD] font-bold">
              {currentContextTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {((mode === 'software' && softwareHistory.length > 0) || (mode === 'physical' && physicalHistory.length > 0)) && (
              <button
                type="button"
                onClick={handleUndo}
                className="text-[11px] font-mono text-[#AAB4C3] hover:text-white flex items-center gap-1 transition-colors"
                title="Undo last change"
              >
                <Undo2 className="w-3 h-3" />
                <span>Undo Change</span>
              </button>
            )}

            {hasActiveOverrides && (
              <button
                type="button"
                onClick={() => {
                  if (mode === 'software') {
                    onResetSoftwareOverrides?.();
                  } else {
                    onResetOverrides?.();
                  }
                }}
                className="text-[11px] font-mono text-[#F87171] hover:text-red-300 flex items-center gap-1 transition-colors"
                title="Reset all modifications to default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{mode === 'software' ? 'Reset Prototype' : 'Reset Visualization'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Bar with Mic & Send */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInterpretAndApply(prompt);
          }}
          className="flex items-center gap-2"
        >
          <div className="pl-2 shrink-0">
            <Sparkles className="w-4 h-4 text-[#4D8DFF]" />
          </div>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              isListening 
                ? 'Listening to speech... Speak your prototype change now...' 
                : mode === 'software'
                ? "Ask the simulation agent to change this prototype (e.g. 'Replace chart with conversion funnel', 'Add campaign comparison table', 'Make dashboard minimal')..."
                : "Ask the simulation agent (e.g. 'Make casing matte black', 'Show internal PCB', 'Put product in workshop')..."
            }
            className={`flex-1 bg-transparent text-xs text-[#F3F4F6] placeholder-[#738095] px-2 py-1.5 focus:outline-none font-sans ${
              isListening ? 'placeholder-[#38BDF8] italic' : ''
            }`}
          />

          <div className="flex items-center gap-1.5 pr-1 shrink-0">
            {/* Voice Input Microphone Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${
                isListening
                  ? 'bg-[#EF4444] text-white animate-pulse shadow-lg'
                  : 'bg-[#1A2536] hover:bg-[#263244] text-[#AAB4C3] hover:text-white border border-[#263244]'
              }`}
              title={isListening ? 'Stop listening' : 'Click to speak change (Voice Recognition)'}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!prompt.trim() || isProcessing}
              className="px-3.5 py-2 rounded-lg bg-[#4D8DFF] hover:bg-[#3B7BE8] text-[#080B10] font-bold text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-40 shadow-sm"
            >
              {isProcessing ? (
                <span className="animate-spin text-xs">⟳</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Speech Error Warning if any */}
        {speechError && (
          <div className="mt-2 text-[11px] font-mono text-[#FCA5A5] flex items-center gap-1 px-2">
            <AlertCircle className="w-3 h-3 text-[#EF4444]" />
            <span>{speechError}</span>
          </div>
        )}
      </div>

      {/* 2. Quick Suggestions Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-mono">
        <span className="text-[#738095] shrink-0 text-[10px] uppercase font-bold flex items-center gap-1">
          <span>Suggestions:</span>
        </span>
        {getSuggestions().map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleInterpretAndApply(suggestion)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-[#0D121B] hover:bg-[#1A2536] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>{suggestion}</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#738095]" />
          </button>
        ))}
      </div>

      {/* 3. Real-Time Visual Feedback Confirmation Banner */}
      {hasActiveOverrides && (
        <div className="px-3.5 py-2 rounded-lg bg-[#0F172A] border border-[#3B82F6]/40 flex items-center justify-between gap-3 text-xs font-mono animate-fadeIn">
          <div className="flex items-center gap-2 text-[#93C5FD]">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>
              <strong>{mode === 'software' ? 'Prototype Modified:' : '3D Scene Updated:'}</strong> {lastMessage || 'Custom simulated parameters active.'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (mode === 'software') {
                onResetSoftwareOverrides?.();
              } else {
                onResetOverrides?.();
              }
            }}
            className="text-[11px] text-[#AAB4C3] hover:text-white underline flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </div>
  );
};
