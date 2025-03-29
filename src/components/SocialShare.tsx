
import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link, Check, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  url: string;
  title: string;
  compact?: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, compact = false }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Ensure we have the full URL for sharing
  const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
  
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank');
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`, '_blank');
  };
  
  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`, '_blank');
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Event link has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={shareToFacebook} aria-label="Share to Facebook">
          <Facebook size={18} />
        </Button>
        <Button variant="outline" size="icon" onClick={shareToTwitter} aria-label="Share to Twitter">
          <Twitter size={18} />
        </Button>
        <Button variant="outline" size="icon" onClick={shareToLinkedin} aria-label="Share to LinkedIn">
          <Linkedin size={18} />
        </Button>
        <Button variant="outline" size="icon" onClick={copyLink} aria-label="Copy link">
          {copied ? <Check size={18} className="text-green-500" /> : <Link size={18} />}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        Share this event
      </h3>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="flex items-center gap-2" onClick={shareToFacebook}>
          <Facebook size={18} />
          Facebook
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={shareToTwitter}>
          <Twitter size={18} />
          Twitter
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={shareToLinkedin}>
          <Linkedin size={18} />
          LinkedIn
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={copyLink}>
          {copied ? <Check size={18} className="text-green-500" /> : <Link size={18} />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
