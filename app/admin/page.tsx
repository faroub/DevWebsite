'use client';

import { useState, useEffect } from 'react';
import {
  Terminal,
  Smartphone,
  FolderGit2,
  BookOpen,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Download,
  RefreshCw,
  Settings,
  Mail,
  Send,
} from 'lucide-react';

interface ContentItem {
  fileName: string;
  filePath?: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

type CollectionType = 'apps' | 'projects' | 'blogs' | 'settings';

export default function LocalAdminPage() {
  const [isLocalHost, setIsLocalHost] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<CollectionType>('apps');
  const [bridgeConnected, setBridgeConnected] = useState<boolean | null>(null);
  const [items, setItems] = useState<Record<'apps' | 'projects' | 'blogs', ContentItem[]>>({
    apps: [],
    projects: [],
    blogs: [],
  });

  // Settings State - Default to mzilab03dz@gmail.com
  const [notifyEmail, setNotifyEmail] = useState<string>('mzilab03dz@gmail.com');
  const [web3formsKey, setWeb3formsKey] = useState<string>('');

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [editedItem, setEditedItem] = useState<ContentItem | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // New Item Template State
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemSlug, setNewItemSlug] = useState('');

  // Localhost Verification Check & Fetch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isLocal =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.endsWith('.local');
      setIsLocalHost(isLocal);
      if (isLocal) {
        fetchLocalContent();
        fetchSettings();
      }
    }
  }, []);

  // Fetch content from local admin file bridge server
  const fetchLocalContent = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setItems(json.data);
          setBridgeConnected(true);
          setStatusMessage('Local admin bridge connected (Port 3001).');
          return;
        }
      }
      setBridgeConnected(false);
    } catch {
      setBridgeConnected(false);
    }
  };

  // Fetch email notification settings
  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/settings');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.settings) {
          if (json.settings.notifyEmail) setNotifyEmail(json.settings.notifyEmail);
          if (json.settings.web3formsKey) setWeb3formsKey(json.settings.web3formsKey);
          localStorage.setItem('mzilab_settings', JSON.stringify(json.settings));
        }
      }
    } catch {
      const saved = localStorage.getItem('mzilab_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.notifyEmail) setNotifyEmail(parsed.notifyEmail);
          if (parsed.web3formsKey) setWeb3formsKey(parsed.web3formsKey);
        } catch {}
      }
    }
  };

  // Save email settings
  const handleSaveSettings = async () => {
    const newSettings = { notifyEmail, web3formsKey };
    localStorage.setItem('mzilab_settings', JSON.stringify(newSettings));

    if (bridgeConnected) {
      try {
        const res = await fetch('http://localhost:3001/api/settings/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings),
        });
        const json = await res.json();
        if (json.success) {
          setStatusMessage(`Notification email saved to disk: ${notifyEmail}`);
          return;
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setStatusMessage(`Error saving settings to disk: ${message}`);
      }
    } else {
      setStatusMessage(`Saved settings to browser storage: ${notifyEmail}`);
    }
  };

  // Send Test Notification Email
  const handleSendTestEmail = async () => {
    const apiKey = web3formsKey.trim() || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

    if (!apiKey || apiKey === 'YOUR_ACCESS_KEY' || apiKey.trim() === '') {
      setStatusMessage('⚠️ Action Needed: Web3Forms Access Key is required! Get a free key at web3forms.com using mzilab03dz@gmail.com, then paste it below.');
      return;
    }

    setStatusMessage('Transmitting test notification email via Web3Forms API...');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: apiKey,
          subject: '[mzilab Test] Email Notification Setup Success',
          from_name: 'mzilab Admin Studio',
          to_email: notifyEmail,
          message: `Hello Farid!\n\nThis is a test notification confirming that comments and reviews posted on your website will be forwarded directly to your personal email inbox: ${notifyEmail}.\n\nTimestamp: ${new Date().toLocaleString()}`,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage(`✅ Success! Test email dispatched to ${notifyEmail}. Check your inbox!`);
      } else {
        setStatusMessage(`❌ Error: ${json.message || 'Invalid Web3Forms Access Key'}. Please check your key at web3forms.com.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setStatusMessage(`Error sending test email: ${message}`);
    }
  };

  // Sync selected item when tab or items change
  useEffect(() => {
    if (activeTab === 'settings') return;
    const currentList = items[activeTab] || [];
    if (currentList.length > 0) {
      const validIndex = Math.min(selectedItemIndex, currentList.length - 1);
      setSelectedItemIndex(validIndex);
      setEditedItem(JSON.parse(JSON.stringify(currentList[validIndex])));
    } else {
      setEditedItem(null);
    }
  }, [activeTab, items, selectedItemIndex]);

  // Handle saving current content item
  const handleSave = async () => {
    if (!editedItem || activeTab === 'settings') return;

    if (bridgeConnected) {
      try {
        const res = await fetch('http://localhost:3001/api/content/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: activeTab,
            fileName: editedItem.fileName,
            frontmatter: editedItem.frontmatter,
            bodyText: editedItem.body,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setStatusMessage(`Successfully saved ${editedItem.fileName} to disk!`);
          await fetchLocalContent();
        } else {
          setStatusMessage(`Error saving: ${json.error}`);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setStatusMessage(`Network error saving file: ${message}`);
      }
    } else {
      downloadMdxFile(editedItem);
      setStatusMessage(`Downloaded ${editedItem.fileName} as fallback.`);
    }
  };

  // Helper to trigger MDX download
  const downloadMdxFile = (item: ContentItem) => {
    const frontmatterLines = Object.entries(item.frontmatter)
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join('\n');
    const fullText = `---\n${frontmatterLines}\n---\n\n${item.body}`;
    const blob = new Blob([fullText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.fileName.endsWith('.mdx') ? item.fileName : `${item.fileName}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Delete item
  const handleDelete = async () => {
    if (!editedItem || activeTab === 'settings') return;
    if (!confirm(`Are you sure you want to delete ${editedItem.fileName}?`)) return;

    if (bridgeConnected) {
      try {
        const res = await fetch('http://localhost:3001/api/content/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: activeTab,
            fileName: editedItem.fileName,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setStatusMessage(`Deleted ${editedItem.fileName}`);
          setSelectedItemIndex(0);
          await fetchLocalContent();
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setStatusMessage(`Error deleting: ${message}`);
      }
    }
  };

  // Create new item
  const handleCreateNew = () => {
    if (!newItemTitle || !newItemSlug || activeTab === 'settings') return;
    const fileName = `${newItemSlug}.mdx`;

    let defaultFrontmatter: Record<string, unknown> = {};
    if (activeTab === 'apps') {
      defaultFrontmatter = {
        title: newItemTitle,
        slug: newItemSlug,
        tagline: 'New mobile application tagline.',
        description: 'Comprehensive overview of the new mobile app.',
        version: '0.1.0',
        status: 'In Development',
        featured: true,
        platforms: ['Android', 'iOS'],
        category: 'Mobile Application',
        languages: ['Kotlin', 'Swift'],
        stars: 0,
        forks: 0,
        updatedAt: new Date().toISOString().split('T')[0],
        downloadLinks: { github: 'https://github.com/mzilab' },
        screenshots: [],
      };
    } else if (activeTab === 'projects') {
      defaultFrontmatter = {
        title: newItemTitle,
        slug: newItemSlug,
        tagline: 'New developer project tagline.',
        description: 'Overview of the new software project.',
        status: 'Active',
        featured: true,
        category: 'Developer Tools',
        techStack: ['TypeScript', 'Next.js'],
        stars: 0,
        forks: 0,
        updatedAt: new Date().toISOString().split('T')[0],
        githubUrl: 'https://github.com/mzilab',
      };
    } else {
      defaultFrontmatter = {
        title: newItemTitle,
        slug: newItemSlug,
        excerpt: 'Short summary of the new technical article.',
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: '5 min read',
        author: 'Faroub / mzilab',
        tags: ['Architecture', 'Mobile'],
        featured: true,
      };
    }

    const newItem: ContentItem = {
      fileName,
      frontmatter: defaultFrontmatter,
      body: `# ${newItemTitle}\n\nWrite your MDX documentation and feature breakdown here...`,
    };

    setEditedItem(newItem);
    setIsCreatingNew(false);
    setNewItemTitle('');
    setNewItemSlug('');
  };

  // If accessed on a deployed non-local production domain, render 404
  if (isLocalHost === false) {
    return (
      <div className="max-w-2xl mx-auto my-12 text-center space-y-6 font-sans">
        <div className="rounded-xl border border-divider bg-surface p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-md border border-accent-error/30 bg-accent-error/10 px-3 py-1 font-mono text-xs text-accent-error font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>404: RESOURCE_NOT_FOUND</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary">
            Page Not Found
          </h1>

          <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
            The page or route you are looking for does not exist or may have been moved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner & Local Bridge Status */}
      <section className="rounded-xl border border-divider bg-surface p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-divider pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold mb-2">
              <Terminal className="h-3.5 w-3.5" />
              <span>mzilab@local-admin:~$ ./studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
              Local Admin & Content Studio
            </h1>
            <p className="text-xs text-text-secondary mt-1 font-mono">
              Directly edit, upload, and configure Apps, Projects, Blogs, and Email Forwarding.
            </p>
          </div>

          {/* Bridge Health Badge */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-xs">
            {bridgeConnected === true ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-success/40 bg-accent-success/10 px-3 py-1 text-accent-success font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>ADMIN_BRIDGE: CONNECTED (Port 3001)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-amber-500 font-bold">
                <AlertCircle className="h-4 w-4" />
                <span>STANDALONE MODE (Run: npm run studio)</span>
              </div>
            )}
            <button
              onClick={() => {
                fetchLocalContent();
                fetchSettings();
              }}
              className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-accent-primary transition-colors font-bold"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Connect / Refresh Bridge</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-md border border-accent-primary/30 bg-canvas p-3 font-mono text-xs text-accent-primary flex items-center justify-between">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage('')} className="text-text-secondary hover:text-text-primary">
              &times;
            </button>
          </div>
        )}

        {/* Collection Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-divider pb-2 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('apps');
              setSelectedItemIndex(0);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all ${
              activeTab === 'apps'
                ? 'bg-accent-primary text-white shadow-sm'
                : 'bg-canvas text-text-secondary border border-divider hover:text-text-primary'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Mobile Apps ({items.apps.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('projects');
              setSelectedItemIndex(0);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-accent-primary text-white shadow-sm'
                : 'bg-canvas text-text-secondary border border-divider hover:text-text-primary'
            }`}
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Developer Projects ({items.projects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('blogs');
              setSelectedItemIndex(0);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all ${
              activeTab === 'blogs'
                ? 'bg-accent-primary text-white shadow-sm'
                : 'bg-canvas text-text-secondary border border-divider hover:text-text-primary'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Blog Posts ({items.blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-accent-primary text-white shadow-sm'
                : 'bg-canvas text-text-secondary border border-divider hover:text-text-primary'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Settings & Email Forwarding</span>
          </button>
        </div>
      </section>

      {/* Main Studio Area */}
      {activeTab === 'settings' ? (
        /* Settings & Email Forwarding View */
        <div className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-6 font-mono text-xs shadow-sm">
          <div className="border-b border-divider pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-sans text-xl font-bold text-text-primary flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent-primary" />
                <span>Comment Notification Email Settings</span>
              </h2>
              <p className="text-text-secondary text-xs mt-1">
                All comments and reviews posted on your apps, projects, or blog pages will be automatically forwarded to this recipient address.
              </p>
            </div>
          </div>

          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-text-primary mb-1 font-bold">
                Personal Recipient Email Address <span className="text-accent-primary">*</span>
              </label>
              <input
                type="email"
                required
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="mzilab03dz@gmail.com"
                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
              />
              <p className="text-[11px] text-text-secondary mt-1">
                New comments and answers will be delivered directly to this inbox.
              </p>
            </div>

            <div>
              <label className="block text-text-primary mb-1 font-bold">
                Web3Forms Access Key <span className="text-accent-primary">*</span>
              </label>
              <input
                type="text"
                value={web3formsKey}
                onChange={(e) => setWeb3formsKey(e.target.value)}
                placeholder="Paste your free Web3Forms access key here"
                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
              />
              <div className="rounded border border-accent-primary/30 bg-canvas p-3 text-[11px] text-text-secondary space-y-1 mt-2">
                <p className="font-bold text-text-primary">💡 How to get your free key in 10 seconds:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Go to <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-accent-primary font-bold underline">web3forms.com</a></li>
                  <li>Enter <strong>mzilab03dz@gmail.com</strong> and click "Create Access Key".</li>
                  <li>Copy the key sent to your email and paste it above!</li>
                </ol>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="inline-flex items-center gap-2 rounded-md border border-accent-primary bg-accent-primary px-5 py-2 font-bold text-white hover:opacity-90 transition-all shadow-sm"
              >
                <Save className="h-4 w-4" />
                <span>Save Email Settings</span>
              </button>

              <button
                type="button"
                onClick={handleSendTestEmail}
                className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-4 py-2 font-bold text-text-primary hover:border-accent-primary transition-all"
              >
                <Send className="h-4 w-4 text-accent-primary" />
                <span>Send Test Notification</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Content Management View (Apps, Projects, Blogs) */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar: Item List */}
          <div className="lg:col-span-1 rounded-xl border border-divider bg-surface p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-divider font-mono text-xs">
              <span className="font-bold text-text-primary capitalize">{activeTab} List</span>
              <button
                onClick={() => setIsCreatingNew(true)}
                className="inline-flex items-center gap-1 rounded bg-accent-primary px-2 py-1 text-[11px] font-bold text-white hover:opacity-90 transition-opacity"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {(items[activeTab] || []).length === 0 ? (
                <div className="p-4 text-center font-mono text-xs text-text-secondary space-y-2">
                  <p>No items found.</p>
                  <p className="text-[11px]">Click <strong>+ New</strong> to create one, or click <strong>Connect / Refresh Bridge</strong>.</p>
                </div>
              ) : (
                (items[activeTab] || []).map((item, idx) => (
                  <button
                    key={item.fileName}
                    onClick={() => {
                      setSelectedItemIndex(idx);
                      setEditedItem(JSON.parse(JSON.stringify(item)));
                    }}
                    className={`w-full text-left p-3 rounded-lg border font-mono text-xs transition-all ${
                      selectedItemIndex === idx
                        ? 'border-accent-primary bg-canvas shadow-sm'
                        : 'border-divider bg-surface hover:bg-canvas'
                    }`}
                  >
                    <div className="font-bold text-text-primary truncate">
                      {String(item.frontmatter.title || item.fileName)}
                    </div>
                    <div className="text-[11px] text-text-secondary truncate mt-0.5">{item.fileName}</div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Studio Area: Content Editor */}
          <div className="lg:col-span-3 rounded-xl border border-divider bg-surface p-6 space-y-6">
            {editedItem ? (
              <div className="space-y-6">
                {/* Top Editor Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-divider pb-4 font-mono text-xs">
                  <div>
                    <span className="text-text-secondary">Editing File: </span>
                    <span className="font-bold text-accent-primary">{editedItem.fileName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                      className="inline-flex items-center gap-1.5 rounded border border-divider bg-canvas px-3 py-1.5 text-text-primary hover:border-accent-primary transition-colors"
                    >
                      {isPreviewOpen ? <Edit3 className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      <span>{isPreviewOpen ? 'Editor' : 'Preview'}</span>
                    </button>

                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>

                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-1.5 rounded border border-accent-primary bg-accent-primary px-4 py-1.5 font-bold text-white hover:opacity-90 transition-all shadow-sm"
                    >
                      {bridgeConnected ? <Save className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                      <span>{bridgeConnected ? 'Save to Disk' : 'Export MDX'}</span>
                    </button>
                  </div>
                </div>

                {!isPreviewOpen ? (
                  <div className="space-y-6">
                    {/* Frontmatter Form Fields */}
                    <div className="space-y-4">
                      <h3 className="font-mono text-xs font-bold text-accent-primary uppercase tracking-wider">
                        1. Frontmatter Metadata
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                        <div>
                          <label className="block text-text-primary mb-1">Title</label>
                          <input
                            type="text"
                            value={String(editedItem.frontmatter.title || '')}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                frontmatter: { ...editedItem.frontmatter, title: e.target.value },
                              })
                            }
                            className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-text-primary mb-1">Slug</label>
                          <input
                            type="text"
                            value={String(editedItem.frontmatter.slug || '')}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                frontmatter: { ...editedItem.frontmatter, slug: e.target.value },
                              })
                            }
                            className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
                          />
                        </div>

                        {activeTab === 'apps' && (
                          <>
                            <div>
                              <label className="block text-text-primary mb-1">Version</label>
                              <input
                                type="text"
                                value={String(editedItem.frontmatter.version || '')}
                                onChange={(e) =>
                                  setEditedItem({
                                    ...editedItem,
                                    frontmatter: { ...editedItem.frontmatter, version: e.target.value },
                                  })
                                }
                                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-text-primary mb-1">Status</label>
                              <select
                                value={String(editedItem.frontmatter.status || 'In Development')}
                                onChange={(e) =>
                                  setEditedItem({
                                    ...editedItem,
                                    frontmatter: { ...editedItem.frontmatter, status: e.target.value },
                                  })
                                }
                                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
                              >
                                <option value="Available">Available</option>
                                <option value="Testing">Testing</option>
                                <option value="Coming Soon">Coming Soon</option>
                                <option value="In Development">In Development</option>
                                <option value="Paused">Paused</option>
                              </select>
                            </div>
                          </>
                        )}

                        {activeTab === 'blogs' && (
                          <>
                            <div>
                              <label className="block text-text-primary mb-1">Author</label>
                              <input
                                type="text"
                                value={String(editedItem.frontmatter.author || '')}
                                onChange={(e) =>
                                  setEditedItem({
                                    ...editedItem,
                                    frontmatter: { ...editedItem.frontmatter, author: e.target.value },
                                  })
                                }
                                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-text-primary mb-1">Read Time</label>
                              <input
                                type="text"
                                value={String(editedItem.frontmatter.readTime || '')}
                                onChange={(e) =>
                                  setEditedItem({
                                    ...editedItem,
                                    frontmatter: { ...editedItem.frontmatter, readTime: e.target.value },
                                  })
                                }
                                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-text-primary mb-1">
                          Short Summary / Tagline
                        </label>
                        <textarea
                          rows={2}
                          value={String(editedItem.frontmatter.tagline || editedItem.frontmatter.excerpt || '')}
                          onChange={(e) => {
                            const key = activeTab === 'blogs' ? 'excerpt' : 'tagline';
                            setEditedItem({
                              ...editedItem,
                              frontmatter: { ...editedItem.frontmatter, [key]: e.target.value },
                            });
                          }}
                          className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 font-mono text-xs focus:border-accent-primary focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Body MDX Content Editor */}
                    <div className="space-y-2">
                      <h3 className="font-mono text-xs font-bold text-accent-primary uppercase tracking-wider">
                        2. MDX Markdown Document Body
                      </h3>
                      <textarea
                        rows={14}
                        value={editedItem.body}
                        onChange={(e) => setEditedItem({ ...editedItem, body: e.target.value })}
                        className="w-full rounded border border-divider bg-[#0F172A] text-white p-4 font-mono text-xs focus:border-accent-primary focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                ) : (
                  /* Live Preview Panel */
                  <div className="space-y-4 font-sans border border-divider bg-canvas p-6 rounded-lg">
                    <div className="font-mono text-xs text-accent-primary font-bold border-b border-divider pb-2">
                      --- LIVE PREVIEW ---
                    </div>
                    <h1 className="text-2xl font-extrabold text-text-primary">{String(editedItem.frontmatter.title)}</h1>
                    <p className="text-sm text-text-secondary italic">
                      {String(editedItem.frontmatter.tagline || editedItem.frontmatter.excerpt || '')}
                    </p>
                    <div className="prose dark:prose-invert text-xs font-mono text-text-primary whitespace-pre-wrap leading-relaxed pt-4 border-t border-divider">
                      {editedItem.body}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center font-mono text-xs text-text-secondary space-y-2">
                <p className="font-bold text-text-primary text-sm">Welcome to Local Content Studio</p>
                <p>Select an item from the sidebar list, or click <strong>+ New</strong> to start creating.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Item Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-xl border border-divider bg-surface p-6 space-y-4 font-mono text-xs shadow-2xl">
            <h3 className="font-bold text-sm text-text-primary">Create New {activeTab.toUpperCase()} Entry</h3>

            <div>
              <label className="block text-text-secondary mb-1">Title</label>
              <input
                type="text"
                value={newItemTitle}
                onChange={(e) => {
                  setNewItemTitle(e.target.value);
                  setNewItemSlug(e.target.value.toLowerCase().replace(/[^a-z0-0]+/g, '-').replace(/(^-|-$)/g, ''));
                }}
                placeholder="My New Entry"
                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-text-secondary mb-1">Slug</label>
              <input
                type="text"
                value={newItemSlug}
                onChange={(e) => setNewItemSlug(e.target.value)}
                placeholder="my-new-entry"
                className="w-full rounded border border-divider bg-[#0F172A] text-white px-3 py-2 focus:border-accent-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsCreatingNew(false)}
                className="rounded border border-divider bg-canvas px-3 py-1.5 text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNew}
                className="rounded border border-accent-primary bg-accent-primary px-4 py-1.5 font-bold text-white hover:opacity-90"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
