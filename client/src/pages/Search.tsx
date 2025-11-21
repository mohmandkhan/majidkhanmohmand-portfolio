import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Search as SearchIcon, ExternalLink, Code2, Briefcase, BookOpen, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [, navigate] = useLocation();

  // Fetch all content
  const { data: projects } = trpc.cms.getProjects.useQuery();
  const { data: experiences } = trpc.cms.getExperiences.useQuery();
  const { data: skills } = trpc.cms.getSkills.useQuery();
  const { data: blogs } = trpc.cms.getBlogs.useQuery();
  const { data: education } = trpc.cms.getEducation.useQuery();

  // Combine and filter results
  const results = {
    projects: projects?.filter((p: any) =>
      searchTerm === '' ? false : 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies?.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [],
    experiences: experiences?.filter((e: any) =>
      searchTerm === '' ? false :
      e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [],
    skills: skills?.filter((s: any) =>
      searchTerm === '' ? false :
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [],
    blogs: blogs?.filter((b: any) =>
      searchTerm === '' ? false :
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [],
    education: education?.filter((ed: any) =>
      searchTerm === '' ? false :
      ed.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ed.degree?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ed.field?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [],
  };

  const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-lg font-bold"
          >
            ← Back
          </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search projects, experiences, skills, blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2"
              autoFocus
            />
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {searchTerm === '' ? (
          <div className="text-center py-12">
            <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Start typing to search...</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-12">
            <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No results found for "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-8">
            <p className="text-muted-foreground">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchTerm}"
            </p>

            {/* Projects */}
            {results.projects.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={20} className="text-accent" />
                  <h2 className="text-2xl font-bold">Projects ({results.projects.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.projects.map((project: any) => (
                    <div key={project.id} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.slice(0, 3).map((tech: string) => (
                            <span key={tech} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline text-sm flex items-center gap-1"
                        >
                          View Project <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experiences */}
            {results.experiences.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={20} className="text-accent" />
                  <h2 className="text-2xl font-bold">Experiences ({results.experiences.length})</h2>
                </div>
                <div className="space-y-3">
                  {results.experiences.map((exp: any) => (
                    <div key={exp.id} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <p className="text-sm text-accent mb-1">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {results.skills.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={20} className="text-accent" />
                  <h2 className="text-2xl font-bold">Skills ({results.skills.length})</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.skills.map((skill: any) => (
                    <span key={skill.id} className="bg-card border border-border rounded-full px-4 py-2">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Blogs */}
            {results.blogs.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} className="text-accent" />
                  <h2 className="text-2xl font-bold">Blogs ({results.blogs.length})</h2>
                </div>
                <div className="space-y-3">
                  {results.blogs.map((blog: any) => (
                    <div key={blog.id} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-bold text-lg">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{blog.description}</p>
                      {blog.url && (
                        <a
                          href={blog.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline text-sm flex items-center gap-1"
                        >
                          Read on {blog.platform} <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {results.education.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-accent" />
                  <h2 className="text-2xl font-bold">Education ({results.education.length})</h2>
                </div>
                <div className="space-y-3">
                  {results.education.map((edu: any) => (
                    <div key={edu.id} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <p className="text-sm text-accent mb-1">{edu.school}</p>
                      <p className="text-sm text-muted-foreground">{edu.field}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
