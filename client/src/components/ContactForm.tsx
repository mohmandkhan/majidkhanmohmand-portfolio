import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { Mail, Phone, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await submitMutation.mutateAsync(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background dark:bg-black">
      <div className="container max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Have a project in mind or want to collaborate? Send me a message and I'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Phone (Optional)</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                required
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              required
              rows={6}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <Mail className="text-yellow-500 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">majid@example.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-yellow-500 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+1 (555) 000-0000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
