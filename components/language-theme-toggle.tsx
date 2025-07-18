"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Globe, Sun, Moon } from 'lucide-react';

export function LanguageThemeToggle() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Language Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.language')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage('vi')}>
            <span className={language === 'vi' ? 'font-semibold' : ''}>
              {t('common.vietnamese')}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('en')}>
            <span className={language === 'en' ? 'font-semibold' : ''}>
              {t('common.english')}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="flex items-center gap-2"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {theme === 'light' ? t('common.dark') : t('common.light')}
        </span>
      </Button>
    </div>
  );
}
