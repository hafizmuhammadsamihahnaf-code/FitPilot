import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Laptop, 
  Check, 
  Copy, 
  CheckCircle2, 
  Terminal, 
  Sparkles
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'android' | 'windows'>('android');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const { isInstallable, isInstalled, install } = usePWAInstall();

  if (!isOpen) return null;

  const currentAppUrl = window.location.origin;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    if (id === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 3000);
    } else {
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md font-comic">
      <div className="bg-[#0c1830]/95 border border-blue-400/30 rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 hover:text-white transition-colors border border-blue-400/20"
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div className="pr-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Desktop .EXE &amp; Android Full App Guide
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Install FitPilot as a Full Offline App
          </h2>
          <p className="text-xs text-blue-200/80 mt-1">
            Enjoy full-screen distraction-free workout coaching on Windows PC and Android phones.
          </p>
        </div>

        {/* Browser Direct 1-Click Install Button if available */}
        {isInstallable && !isInstalled && (
          <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-xs font-bold text-blue-300 flex items-center justify-center sm:justify-start gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Direct 1-Click Browser Install Available</span>
              </div>
              <div className="text-[11px] text-blue-200/70">
                Install to your home screen or desktop with no additional downloads.
              </div>
            </div>
            <button
              onClick={install}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
            >
              <Download size={14} />
              <span>Install App</span>
            </button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex rounded-2xl bg-blue-950/80 p-1 border border-blue-400/20">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'android'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-300/70 hover:text-white'
            }`}
          >
            <Smartphone size={16} />
            <span>1. Android Mobile Install</span>
          </button>

          <button
            onClick={() => setActiveTab('windows')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'windows'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-300/70 hover:text-white'
            }`}
          >
            <Laptop size={16} />
            <span>2. Windows Standalone (.EXE)</span>
          </button>
        </div>

        {/* Tab Content: Android */}
        {activeTab === 'android' && (
          <div className="space-y-4 text-xs text-blue-100">
            {/* Method 1: PWA Add to Home Screen */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[11px]">
                    A
                  </span>
                  Method 1: Direct Android Install (Recommended)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30">
                  Fast • 100% Offline
                </span>
              </div>

              <ol className="space-y-2.5 list-decimal pl-4 leading-relaxed text-[11px] text-blue-200/80">
                <li>
                  Open <strong>Google Chrome</strong> on your Android phone.
                </li>
                <li>
                  Copy and open your FitPilot link:
                  <div className="mt-1.5 flex items-center gap-2 bg-blue-950/90 p-2 rounded-xl border border-blue-400/20 font-mono text-[11px] text-blue-200">
                    <span className="truncate flex-1">{currentAppUrl}</span>
                    <button
                      onClick={() => handleCopy(currentAppUrl, 'url')}
                      className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800/60 text-white flex items-center gap-1 shrink-0 transition-colors"
                    >
                      {copiedUrl ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedUrl ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </li>
                <li>
                  Tap the <strong>three dots menu (⋮)</strong> at the top right of Chrome.
                </li>
                <li>
                  Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                </li>
                <li>
                  FitPilot will be added to your home screen and app drawer as an independent native app that works completely offline.
                </li>
              </ol>
            </div>

            {/* Method 2: Standalone APK via PWABuilder */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[11px]">
                    B
                  </span>
                  Method 2: Export Android .APK File
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
                  Google Play / APK
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-200/80">
                To generate a direct <code>.apk</code> package for distribution or local sideloading:
              </p>
              <ol className="space-y-1.5 list-decimal pl-4 text-[11px] text-blue-200/80">
                <li>
                  Visit{' '}
                  <a
                    href="https://www.pwabuilder.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    PWABuilder.com
                  </a>.
                </li>
                <li>Paste your FitPilot URL and click <strong>&quot;Start&quot;</strong>.</li>
                <li>Select <strong>Android &gt; Generate Package / Download APK</strong>.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab Content: Windows EXE */}
        {activeTab === 'windows' && (
          <div className="space-y-4 text-xs text-blue-100">
            {/* Method 1: PySide6 .exe */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[11px]">
                    1
                  </span>
                  Method 1: Built-in Python + PyInstaller Single-File .EXE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30">
                  Standalone .EXE
                </span>
              </div>

              <p className="text-[11px] text-blue-200/80">
                <code>FitPilot_desktop.py</code> and <code>build_windows.bat</code> are included in the project root:
              </p>

              <div className="bg-blue-950/90 p-3 rounded-xl border border-blue-400/20 font-mono text-[11px] text-blue-200 space-y-2">
                <div className="flex items-center justify-between text-blue-400/70 border-b border-blue-400/15 pb-1">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} />
                    <span>Windows Command Prompt</span>
                  </span>
                  <button
                    onClick={() => handleCopy('pip install -r requirements.txt\npyinstaller --onefile --noconsole --name "FitPilot" FitPilot_desktop.py', 'cmd1')}
                    className="text-xs text-blue-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedCmd === 'cmd1' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedCmd === 'cmd1' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div>pip install -r requirements.txt</div>
                <div>pyinstaller --onefile --noconsole --name &quot;FitPilot&quot; FitPilot_desktop.py</div>
              </div>

              <p className="text-[11px] text-blue-300 font-medium">
                The output <code>dist\FitPilot.exe</code> launches directly without any browser window!
              </p>
            </div>

            {/* Method 2: Native Web Wrapper via Nativefier */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[11px]">
                    2
                  </span>
                  Method 2: Package Full Web UI with Nativefier
                </span>
              </div>

              <p className="text-[11px] text-blue-200/80">
                Wrap this web app into a single native Windows desktop executable:
              </p>

              <div className="bg-blue-950/90 p-3 rounded-xl border border-blue-400/20 font-mono text-[11px] text-blue-200 space-y-2">
                <div className="flex items-center justify-between text-blue-400/70 border-b border-blue-400/15 pb-1">
                  <span>Terminal / PowerShell</span>
                  <button
                    onClick={() => handleCopy(`npx @nativefier/nativefier --name "FitPilot" --single-instance "${currentAppUrl}"`, 'cmd2')}
                    className="text-xs text-blue-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedCmd === 'cmd2' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedCmd === 'cmd2' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="break-all">
                  npx @nativefier/nativefier --name &quot;FitPilot&quot; --single-instance &quot;{currentAppUrl}&quot;
                </div>
              </div>
            </div>

            {/* Method 3: Desktop PWA */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 space-y-2">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[11px]">
                  3
                </span>
                Method 3: Chrome or Edge Desktop App
              </span>
              <p className="text-[11px] leading-relaxed text-blue-200/80">
                In Chrome or Edge on Windows, click the <strong>Install icon</strong> in the address bar or select <strong>Menu &gt; Apps &gt; Install FitPilot</strong> to pin it directly to your Windows Taskbar and Start Menu.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-blue-400/20 flex items-center justify-between">
          <span className="text-[11px] text-blue-300/70">
            FitPilot • 100% Private, Local &amp; Offline
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
