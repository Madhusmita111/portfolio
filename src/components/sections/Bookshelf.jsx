import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { Books, BookmarkSimple, ArrowUpRight, Star, Quotes } from '@phosphor-icons/react';

function BookCard({ book, index }) {
  const [showTakeaway, setShowTakeaway] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative rounded-xl border border-card-border hover:border-card-border-hover bg-card hover:bg-card-hover transition-all duration-300 p-5 flex flex-col justify-between gap-3.5"
    >
      <div className="flex flex-col gap-2">
        {/* Top meta: Category & Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-light bg-surface px-2.5 py-0.5 rounded-full border border-border/30">
            {book.category}
          </span>
          {book.status === 'Favorite' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-500/90 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <Star weight="fill" className="w-3 h-3" />
              Favorite
            </span>
          )}
          {book.status === 'Currently Reading' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <BookmarkSimple weight="fill" className="w-3 h-3" />
              Reading
            </span>
          )}
        </div>

        {/* Title & Author */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground leading-snug">
            {book.title}
          </h3>
          <p className="text-xs text-muted-light font-mono">
            by <span className="text-muted font-medium">{book.author}</span>
          </p>
        </div>
      </div>

      {/* Reference / Key Takeaway */}
      {book.reference && (
        <div className="pt-2 border-t border-border/30">
          <div className="flex items-start gap-2 bg-surface/60 rounded-lg p-3 border border-border/20">
            <Quotes weight="fill" className="w-4 h-4 shrink-0 text-ink-light opacity-60 mt-0.5" />
            <p className="text-[12.5px] text-muted italic leading-relaxed font-normal">
              "{book.reference}"
            </p>
          </div>
        </div>
      )}

      {/* External reference link */}
      {book.link && (
        <div className="flex items-center justify-end pt-1">
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors group-hover:underline decoration-border-heavy underline-offset-4"
          >
            <span>Reference</span>
            <ArrowUpRight weight="bold" className="w-3 h-3" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function Bookshelf() {
  const { books } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!books || books.length === 0) return null;

  // Extract unique categories
  const categories = ['All', ...new Set(books.map((b) => b.category))];

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter((b) => b.category === selectedCategory);

  return (
    <Section id="books" title="Books I Read">
      <div className="flex flex-col gap-5 pt-2">
        {/* Intro */}
        <p className="text-sm text-muted leading-relaxed max-w-xl">
          An avid reader exploring distributed systems, machine intelligence, classic literature, and psychology. Books continually shape how I architect software, design experiences, and approach problem solving.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-foreground text-background border-foreground shadow-sm'
                  : 'bg-surface text-muted hover:text-foreground border-border/40 hover:border-border-heavy'
              }`}
            >
              {cat}
              {cat === 'All' && (
                <span className="ml-1.5 opacity-60 font-mono text-[10px]">
                  ({books.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, idx) => (
              <BookCard key={book.title} book={book} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
