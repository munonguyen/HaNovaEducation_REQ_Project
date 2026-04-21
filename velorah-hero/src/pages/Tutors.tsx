import { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Clock3,
  GraduationCap,
  Search,
  SlidersHorizontal,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { tutorAvatars, tutors, type TutorRecord } from '../data/tutors';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const expertiseHighlights = [
  'AP Calculus',
  'IELTS Writing',
  'IB Physics',
  'University Prep',
  'Python Foundations',
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.06, ease },
  }),
};

export default function Tutors() {
  const [selectedTutor, setSelectedTutor] = useState<TutorRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilters, setSubjectFilters] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('Any Availability');
  const [priceFilter, setPriceFilter] = useState('Any Budget');
  const [languageFilter, setLanguageFilter] = useState('Any Language');
  const [formatFilter, setFormatFilter] = useState('Any Format');
  const [expertiseFilter, setExpertiseFilter] = useState('All Expertise');

  const subjectOptions = Array.from(new Set(tutors.flatMap((tutor) => tutor.subjects))).sort();
  const languageOptions = ['Any Language', ...new Set(tutors.flatMap((tutor) => tutor.languages))];
  const formatOptions = ['Any Format', ...new Set(tutors.flatMap((tutor) => tutor.formats))];

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      searchTerm.trim().length === 0 ||
      [tutor.name, tutor.role, tutor.university, ...tutor.subjects, ...tutor.expertise]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSubject = subjectFilters.length === 0 || tutor.subjects.some(sub => subjectFilters.includes(sub));
    const matchesAvailability =
      availabilityFilter === 'Any Availability' || tutor.availability === availabilityFilter;
    const matchesLanguage =
      languageFilter === 'Any Language' || tutor.languages.includes(languageFilter);
    const matchesFormat = formatFilter === 'Any Format' || tutor.formats.includes(formatFilter);
    const matchesExpertise =
      expertiseFilter === 'All Expertise' || tutor.expertise.includes(expertiseFilter);
    const matchesPrice =
      priceFilter === 'Any Budget' ||
      (priceFilter === 'Under $30' && tutor.hourlyRate < 30) ||
      (priceFilter === '$30 - $32' && tutor.hourlyRate >= 30 && tutor.hourlyRate <= 32) ||
      (priceFilter === '$33+' && tutor.hourlyRate >= 33);

    return (
      matchesSearch &&
      matchesSubject &&
      matchesAvailability &&
      matchesLanguage &&
      matchesFormat &&
      matchesExpertise &&
      matchesPrice
    );
  });

  const featuredTutor = filteredTutors[0] ?? null;
  const remainingTutors = filteredTutors.length > 0 ? filteredTutors.slice(1) : [];
  const trendingSubjects = Array.from(new Set(filteredTutors.flatMap((tutor) => tutor.subjects))).slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      className="flex w-full flex-col items-center pb-32"
    >
      <BookingModal
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
        tutorName={selectedTutor?.name ?? ''}
        hourlyRate={selectedTutor?.hourlyRate}
        subject={selectedTutor?.subjects[0]}
        formats={selectedTutor?.formats}
      />

      {/* Header Section */}
      <section className="w-full border-b border-white/[0.05] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_68%)] px-6 py-16 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-6 text-[11px] uppercase tracking-[0.32em] text-white/45"
            >
              Tutor Discovery
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease }}
              className="text-4xl font-serif leading-[1.05] tracking-tight text-white md:text-5xl lg:text-7xl"
            >
              Find a tutor with a clear method,
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {' '}
                proven outcomes
              </span>
              , and the right fit for your goals.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
              className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg"
            >
              Compare mentors by subject, availability, format, and budget. Every profile is structured to help
              you decide fast and book with confidence.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[420px]"
          >
            {[
              { label: 'Verified Mentors', value: `${tutors.length}+` },
              { label: 'Avg. Rating', value: '4.9/5' },
              { label: 'Quick Response', value: '< 2h' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 backdrop-blur-md"
              >
                <p className="text-xl font-serif text-white md:text-2xl">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-6 mt-16 items-start">
        {/* Left Sidebar Filter Component */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24 rounded-[30px] bg-white/[0.025] backdrop-blur-xl border border-white/[0.1] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
        >
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/[0.04]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-blue-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <SlidersHorizontal size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-white">Filters</h3>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Refine Search</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Search Keywords</p>
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 focus-within:border-white/20 focus-within:bg-white/[0.04] transition-colors">
                <Search size={16} className="text-white/40" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  type="text"
                  placeholder="Name, role, topic..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Selects */}
            <div className="space-y-5">
              <MultiSelectDropdown 
                 label="Subject / Field" 
                 values={subjectFilters} 
                 options={subjectOptions} 
                 onChange={(val) => setSubjectFilters(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])} 
              />
              {[
                { label: 'Availability', value: availabilityFilter, setter: setAvailabilityFilter, options: ['Any Availability', 'Today', 'This Week', 'Limited'] },
                { label: 'Pricing', value: priceFilter, setter: setPriceFilter, options: ['Any Budget', 'Under $30', '$30 - $32', '$33+'] },
                { label: 'Instruction Language', value: languageFilter, setter: setLanguageFilter, options: languageOptions },
                { label: 'Session Format', value: formatFilter, setter: setFormatFilter, options: formatOptions },
              ].map((filter) => (
                 <CustomDropdown key={filter.label} label={filter.label} value={filter.value} options={filter.options} onChange={filter.setter} />
              ))}
            </div>

            {/* Popular Expertise */}
            <div className="pt-4 border-t border-white/[0.04]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 ml-1">Popular Expertise</p>
              <div className="flex flex-wrap gap-2">
                {expertiseHighlights.map((item) => {
                  const active = expertiseFilter === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setExpertiseFilter(active ? 'All Expertise' : item)}
                      className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-widest transition-all ${
                        active
                          ? 'border-blue-400 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                          : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 mt-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSubjectFilters([]);
                  setAvailabilityFilter('Any Availability');
                  setPriceFilter('Any Budget');
                  setLanguageFilter('Any Language');
                  setFormatFilter('Any Format');
                  setExpertiseFilter('All Expertise');
                }}
                className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Right Content Area (Tutors List) */}
        <div className="flex-1 w-full flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-white/70">
            <span>
              Showing <strong className="font-medium text-white">{filteredTutors.length}</strong> available mentors
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/55">
              Sorted by best match
            </span>
          </div>

          {trendingSubjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
            >
              <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-white/45">Trending Fields</span>
              {trendingSubjects.map((subject) => {
                const active = subjectFilters.includes(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => setSubjectFilters(prev => active ? prev.filter(s => s !== subject) : [...prev, subject])}
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] transition-all ${
                      active
                        ? 'border-blue-400 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                        : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {subject}
                  </button>
                );
              })}
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {featuredTutor ? (
              <motion.section
                key="featured"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease }}
                className="group relative overflow-hidden rounded-[34px] border border-white/[0.1] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(8,12,24,0.55))] shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/15 blur-[105px]" />
                <div className="grid h-full lg:grid-cols-[320px_1fr]">
                  <div className="relative h-[320px] overflow-hidden lg:h-auto">
                    <img
                      src={tutorAvatars[featuredTutor.id]}
                      alt={featuredTutor.name}
                      className="h-full w-full object-cover brightness-110 transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/85 via-[#020205]/20 to-transparent opacity-85" />
                    <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Best Match</span>
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                        <div>
                          <p className="mb-2 text-sm font-medium text-blue-300">{featuredTutor.role}</p>
                          <h2 className="text-4xl font-serif text-white lg:text-5xl">{featuredTutor.name}</h2>
                          <div className="flex items-center gap-4 mt-4 text-sm">
                            <span className="flex items-center gap-1.5 text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                              <Star size={14} className="fill-amber-400 text-amber-400" />
                              <strong className="text-white">{featuredTutor.rating.toFixed(2)}</strong>
                              <span className="text-white/40">({featuredTutor.reviews})</span>
                            </span>
                            <span className="text-white/50">{featuredTutor.university}</span>
                          </div>
                        </div>

                        <div className="text-left md:text-right md:min-w-[140px]">
                          <p className="text-4xl font-serif text-white">${featuredTutor.hourlyRate}</p>
                          <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Per Session</p>
                        </div>
                      </div>

                      <p className="mb-8 leading-relaxed text-white/72">{featuredTutor.headline}</p>

                      <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/[0.04]">
                        <div className="flex items-start gap-3">
                          <Clock3 size={18} className="mt-0.5 text-emerald-400" />
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Response</p>
                            <p className="text-sm text-white/90">{featuredTutor.responseTime}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <GraduationCap size={18} className="mt-0.5 text-blue-400" />
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Topics</p>
                            <p className="text-sm text-white/90 truncate">{featuredTutor.subjects.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-2">
                        {tutorTags(featuredTutor).map((tag, i) => (
                          <span key={i} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
                             {tag}
                           </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Link
                          to={`/tutors/${featuredTutor.id}`}
                          className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/5"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => setSelectedTutor(featuredTutor)}
                          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                        >
                          Book Session <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-[34px] border border-white/[0.08] bg-white/[0.02] p-16"
              >
                <Search size={48} className="mb-6 text-white/20" />
                <h3 className="mb-2 text-2xl font-serif text-white">No matching mentors</h3>
                <p className="max-w-md text-center text-white/55">
                  Try broader filters or reset all options to view more verified tutors.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSubjectFilter('All Subjects');
                    setAvailabilityFilter('Any Availability');
                    setPriceFilter('Any Budget');
                    setLanguageFilter('Any Language');
                    setFormatFilter('Any Format');
                    setExpertiseFilter('All Expertise');
                  }}
                  className="mt-8 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}

            {/* Remaining Tutors Grid */}
            {remainingTutors.length > 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 grid gap-5 md:grid-cols-2"
              >
                {remainingTutors.map((tutor, index) => (
                  <motion.article
                    key={tutor.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    custom={index}
                    className="group flex flex-col rounded-[28px] border border-white/[0.09] bg-white/[0.02] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.2] hover:bg-white/[0.035]"
                  >
                    <div className="flex gap-5 mb-6">
                      <div className="relative">
                        <img
                          src={tutorAvatars[tutor.id]}
                          alt={tutor.name}
                          className="h-24 w-24 rounded-[20px] border border-white/10 object-cover grayscale-[0.2] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute -bottom-2 -right-2 rounded-full border border-white/10 bg-[#020205] p-1">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
                            {tutor.availability === 'Today' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-xl font-serif text-white truncate">{tutor.name}</h3>
                        <p className="text-xs text-blue-400 mt-1 truncate">{tutor.role}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="text-white/90 font-medium">{tutor.rating.toFixed(2)}</span>
                          <span className="text-white/40">({tutor.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <p className="mb-6 min-h-[42px] line-clamp-2 text-sm text-white/62">{tutor.headline}</p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {tutor.expertise.slice(0, 2).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-blue-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Rate</p>
                        <p className="text-sm text-white font-medium">${tutor.hourlyRate} / hr</p>
                      </div>
                      <div>
                         <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Next Slot</p>
                         <p className="text-sm text-white/90 truncate">{tutor.nextSlots[0]}</p>
                      </div>
                    </div>

                    <p className="mb-6 line-clamp-2 text-xs leading-relaxed text-white/52">{tutor.matchNote}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <Link
                        to={`/tutors/${tutor.id}`}
                        className="border-b border-transparent pb-0.5 text-xs font-medium uppercase tracking-widest text-white/50 transition-all hover:border-white/50 hover:text-white"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => setSelectedTutor(tutor)}
                        className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-all hover:bg-white/20"
                      >
                        Book
                      </button>
                    </div>
                  </motion.article>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Utility to grab prominent tags for the featured match
function tutorTags(tutor: TutorRecord) {
  const tags = new Set<string>();
  if (tutor.expertise.length > 0) tags.add(tutor.expertise[0]);
  if (tutor.formats.length > 0) tags.add(tutor.formats[0]);
  if (tutor.languages.includes('Vietnamese')) tags.add('Bilingual');
  return Array.from(tags).slice(0, 3);
}

function CustomDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">{label}</p>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white hover:bg-white/[0.04] hover:border-white/20 focus:border-blue-500/50 transition-all"
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={16} className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 left-0 right-0 mt-2 max-h-[320px] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#070912]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5 custom-scrollbar"
          >
            {options.map(opt => (
               <button
                 key={opt}
                 onClick={() => { onChange(opt); setIsOpen(false); }}
                 className={`w-full text-left px-4 py-3 rounded-xl text-[13px] transition-all duration-200 ${value === opt ? 'bg-blue-500/10 text-blue-300 font-semibold' : 'text-white/70 hover:bg-white/[0.04] hover:text-white'}`}
               >
                  {opt}
               </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MultiSelectDropdown({ label, values, options, onChange }: { label: string; values: string[]; options: string[]; onChange: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = values.length === 0 ? 'All Subjects' : values.length === 1 ? values[0] : `${values.length} Selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">{label}</p>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white hover:bg-white/[0.04] hover:border-white/20 focus:border-blue-500/50 transition-all"
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown size={16} className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 left-0 right-0 mt-2 max-h-[320px] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#070912]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5 custom-scrollbar"
          >
            {options.map(opt => {
               const isActive = values.includes(opt);
               return (
                 <button
                   key={opt}
                   onClick={() => onChange(opt)}
                   className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-300 font-semibold' : 'text-white/70 hover:bg-white/[0.04] hover:text-white'}`}
                 >
                    <span>{opt}</span>
                    {isActive && <CheckCircle2 size={16} className="text-blue-400" />}
                 </button>
               )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

