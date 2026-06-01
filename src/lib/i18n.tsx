import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
  ReactNode
} from 'react';
type Lang = 'en' | 'ur';
type Dict = Record<
  string,
  {
    en: string;
    ur: string;
  }>;

// Centralised copy. Keep keys terse and namespaced.
export const dict: Dict = {
  'nav.admissions': {
    en: 'Admissions Portal',
    ur: 'داخلہ پورٹل'
  },
  'nav.programs': {
    en: 'Programs',
    ur: 'پروگرامز'
  },
  'nav.find': {
    en: 'Find My Program',
    ur: 'میرا پروگرام تلاش کریں'
  },
  'nav.scholarships': {
    en: 'Scholarships',
    ur: 'وظائف'
  },
  'nav.faqs': {
    en: 'FAQs',
    ur: 'سوالات'
  },
  'nav.login': {
    en: 'Log in',
    ur: 'لاگ ان'
  },
  'nav.start': {
    en: 'Start your application',
    ur: 'درخواست شروع کریں'
  },
  'hero.eyebrow': {
    en: 'Fall 2026 admissions are open',
    ur: 'فال 2026 کے داخلے کھل چکے ہیں'
  },
  'hero.title': {
    en: 'Your Future Starts Here',
    ur: 'آپ کی CECOS درخواست۔\n5 منٹ میں مکمل۔'
  },
  'hero.sub': {
    en: 'Apply online or visit our campus. Same form, five minutes to complete.',
    ur: 'اپنے فون سے درخواست دیں یا ہمارے حیات آباد کیمپس آئیں۔ ایک ہی فارم، انگریزی یا اردو میں۔'
  },
  'hero.cta1': {
    en: 'Start your application',
    ur: 'درخواست شروع کریں'
  },
  'hero.cta2': {
    en: 'Find a program for me',
    ur: 'میرے لیے پروگرام تلاش کریں'
  },
  'hero.timeBadge': {
    en: 'Avg. completion time: 5 minutes.',
    ur: 'اوسط وقت: موبائل پر 4 منٹ۔'
  },
  'hero.trust1': {
    en: 'Since 1986',
    ur: '1986 سے'
  },
  'hero.trust2': {
    en: '22,000+ students',
    ur: '22,000+ طلبہ'
  },
  'hero.trust3': {
    en: 'HEC recognized (W3)',
    ur: 'HEC سے منظور شدہ (W3)'
  },
  'hero.trust4': {
    en: 'ISO 9001 & ISO 21001 certified',
    ur: 'ISO 9001 تصدیق شدہ'
  },
  'cd.label': {
    en: 'Admission closes in',
    ur: 'داخلے بند ہونے میں'
  },
  'cd.sub': {
    en: 'Phase 2 opens at PKR 500 for returning applicants.',
    ur: 'فیز 2 پرانے درخواست گزاروں کے لیے PKR 500 پر کھلتا ہے۔'
  },
  'cd.days': {
    en: 'Days',
    ur: 'دن'
  },
  'cd.hours': {
    en: 'Hours',
    ur: 'گھنٹے'
  },
  'cd.minutes': {
    en: 'Minutes',
    ur: 'منٹ'
  },
  'cd.seconds': {
    en: 'Seconds',
    ur: 'سیکنڈ'
  },
  'stats.1': {
    en: 'Discipline groups',
    ur: 'تعلیمی گروپس'
  },
  'stats.2': {
    en: 'Programs across BS & MS',
    ur: 'BS اور MS پروگرامز'
  },
  'stats.3': {
    en: 'Scholarships & concessions',
    ur: 'وظائف اور رعایتیں'
  },
  'stats.4': {
    en: 'Program choices per applicant',
    ur: 'فی درخواست گزار پروگرام انتخاب'
  },
  'find.title': {
    en: 'Not sure which program is for you?',
    ur: 'یقین نہیں کہ کون سا پروگرام آپ کے لیے ہے؟'
  },
  'find.sub': {
    en: "Tell us about your background. We'll show only the programs you're eligible for.",
    ur: 'اپنے بارے میں بتائیں۔ ہم صرف وہی پروگرام دکھائیں گے جن کے لیے آپ اہل ہیں۔'
  },
  'find.step1': {
    en: 'What did you study?',
    ur: 'آپ نے کیا پڑھا؟'
  },
  'find.step2': {
    en: 'What were your marks?',
    ur: 'آپ کے نمبر کتنے تھے؟'
  },
  'find.step3': {
    en: 'What excites you?',
    ur: 'آپ کو کیا پسند ہے؟'
  },
  'find.step3.help': {
    en: 'Pick up to 3.',
    ur: 'زیادہ سے زیادہ 3 منتخب کریں۔'
  },
  'find.next': {
    en: 'Next',
    ur: 'اگلا'
  },
  'find.back': {
    en: 'Back',
    ur: 'پیچھے'
  },
  'find.see': {
    en: 'See my matches',
    ur: 'میرے میچز دیکھیں'
  },
  'find.result': {
    en: "You're eligible for",
    ur: 'آپ اہل ہیں'
  },
  'find.programs': {
    en: 'programs.',
    ur: 'پروگرامز کے لیے۔'
  },
  'find.continue': {
    en: 'Continue these to my application',
    ur: 'انہیں درخواست میں شامل کریں'
  },
  'find.browseAll': {
    en: 'Or browse all programs →',
    ur: 'یا تمام پروگرامز دیکھیں ←'
  },
  'find.restart': {
    en: 'Start over',
    ur: 'دوبارہ شروع کریں'
  },
  'find.eligible': {
    en: 'Eligible',
    ur: 'اہل'
  },
  'find.close': {
    en: 'Close — possible',
    ur: 'قریب — ممکن'
  },
  'find.notEligible': {
    en: 'Not eligible',
    ur: 'نا اہل'
  },
  'programs.title': {
    en: 'Explore our programs.',
    ur: 'ہمارے پروگرامز دریافت کریں۔'
  },
  'programs.sub': {
    en: 'Choose up to 3 programs in your application, in priority order.',
    ur: 'اپنی درخواست میں ترجیحی ترتیب سے 3 پروگرامز تک منتخب کریں۔'
  },
  'programs.group': {
    en: 'Group',
    ur: 'گروپ'
  },
  'compare.title': {
    en: 'Torn between two programs? Compare them side by side.',
    ur: 'دو پروگرامز میں الجھن؟ ان کا موازنہ کریں۔'
  },
  'compare.sub': {
    en: 'Match eligibility, duration, and test requirements in one view — before you commit.',
    ur: 'فیصلہ کرنے سے پہلے اہلیت، دورانیہ اور ٹیسٹ کا موازنہ کریں۔'
  },
  'compare.a': {
    en: 'Program A',
    ur: 'پروگرام A'
  },
  'compare.b': {
    en: 'Program B',
    ur: 'پروگرام B'
  },
  'compare.btn': {
    en: 'Compare',
    ur: 'موازنہ'
  },
  'compare.duration': {
    en: 'Duration',
    ur: 'دورانیہ'
  },
  'compare.eligibility': {
    en: 'Minimum eligibility',
    ur: 'کم از کم اہلیت'
  },
  'compare.test': {
    en: 'Test required',
    ur: 'ٹیسٹ درکار'
  },
  'compare.group': {
    en: 'Group',
    ur: 'گروپ'
  },
  'compare.close': {
    en: 'Close',
    ur: 'بند کریں'
  },
  'sch.title': {
    en: 'Scholarships & concessions that go further than the brochure.',
    ur: 'وظائف اور رعایتیں جو بروشر سے کہیں زیادہ ہیں۔'
  },
  'sch.sub': {
    en: "You don't apply for these here — but knowing what you qualify for can change your decision.",
    ur: 'ان کے لیے یہاں درخواست نہیں دینی — لیکن جاننا آپ کا فیصلہ بدل سکتا ہے۔'
  },
  'sch.footer': {
    en: 'Calculated and verified after admission.',
    ur: 'داخلے کے بعد طے ہوتا ہے۔ مکمل فہرست ←'
  },
  'sch.all': {
    en: 'All',
    ur: 'تمام'
  },
  'sch.merit': {
    en: 'Merit',
    ur: 'میرٹ'
  },
  'sch.female': {
    en: 'Female Concession',
    ur: 'صرف خواتین'
  },
  'sch.need': {
    en: 'Need-based',
    ur: 'ضرورت پر مبنی'
  },
  'sch.regional': {
    en: 'Regional',
    ur: 'علاقائی'
  },
  'sch.family': {
    en: 'Family / Alumni',
    ur: 'خاندان / سابق طلبہ'
  },
  'stories.title': {
    en: 'Real journeys. Real graduates.',
    ur: 'حقیقی سفر۔ حقیقی فارغ التحصیل۔'
  },
  'stories.sub': {
    en: "From the foothills of Chitral to engineering firms in Karachi — here's where CECOS took them.",
    ur: 'چترال سے کراچی کی انجینئرنگ فرمز تک — یہ ہے جہاں CECOS نے انہیں پہنچایا۔'
  },
  'stories.read': {
    en: 'Read full story →',
    ur: 'مکمل کہانی پڑھیں ←'
  },
  'how.title': {
    en: 'How it works',
    ur: 'یہ کیسے کام کرتا ہے'
  },
  'how.1.t': {
    en: 'Sign up & start your form',
    ur: 'سائن اپ کریں اور فارم شروع کریں'
  },
  'how.1.d': {
    en: 'Phone + CNIC, verified by OTP in seconds. Then a short personal and academic section with helpful tooltips.',
    ur: 'فون + شناختی کارڈ، چند سیکنڈ میں OTP سے تصدیق۔ پھر مختصر ذاتی اور تعلیمی معلومات — ٹول ٹپس انگریزی اور اردو میں۔'
  },
  'how.2.t': {
    en: 'Choose 3 programs',
    ur: '3 پروگرام منتخب کریں'
  },
  'how.2.d': {
    en: "Pick up to three programs in priority order. Use Find My Program above if you're unsure.",
    ur: 'ترجیحی ترتیب سے تین تک پروگرام منتخب کریں۔ اگر یقین نہ ہو تو اوپر "میرا پروگرام تلاش کریں" استعمال کریں۔'
  },
  'how.3.t': {
    en: 'Pay & submit',
    ur: 'فیس ادا کر کے جمع کرائیں'
  },
  'how.3.d': {
    en: 'PKR 1,500 (UG) or PKR 2,000 (PG) via PayPro, or at our campus counter. Receipt by Email & WhatsApp.',
    ur: 'PKR 1,500 (UG) یا PKR 2,000 (PG)، PayPro سے یا کیمپس کاؤنٹر پر۔ رسید ای میل اور واٹس ایپ پر۔'
  },
  'how.closer': {
    en: "Started online but want to finish at the counter? Just walk in with your CNIC. We'll pick up exactly where you left off.",
    ur: 'آن لائن شروع کیا لیکن کاؤنٹر پر مکمل کرنا چاہتے ہیں؟ اپنا شناختی کارڈ لے کر آئیں۔ ہم وہیں سے شروع کریں گے جہاں آپ رکے تھے۔'
  },
  'faqs.title': {
    en: 'Questions students actually ask us.',
    ur: 'طلبہ اکثر یہ سوال پوچھتے ہیں۔'
  },
  'final.eyebrow': {
    en: 'FALL 2026 ADMISSIONS',
    ur: 'فال 2026 داخلے'
  },
  'final.title': {
    en: 'Begin your journey with CECOS University',
    ur: '5 منٹ۔ ایک فارم۔ CECOS میں آپ کا مستقبل۔'
  },
  'final.sub': {
    en: 'No spam, no commitment until you submit. Save your draft anytime.',
    ur: 'کوئی اسپام نہیں، جمع کرانے تک کوئی پابندی نہیں۔ کسی بھی وقت ڈرافٹ محفوظ کریں۔'
  },
  'footer.contact': {
    en: 'Contact',
    ur: 'رابطہ'
  },
  'footer.quick': {
    en: 'Quick links',
    ur: 'فوری لنکس'
  },
  'footer.support': {
    en: 'Support & social',
    ur: 'سپورٹ اور سوشل'
  },
  'footer.address': {
    en: 'Phase 6, Sector F-5, Hayatabad, Peshawar',
    ur: 'فیز 6، سیکٹر F-5، حیات آباد، پشاور'
  },
  'footer.hours': {
    en: 'Office hours: Mon–Fri, 9:00 AM – 5:00 PM',
    ur: 'دفتری اوقات: پیر–جمعہ، 9:00 AM – 5:00 PM'
  },
  'footer.rights': {
    en: '© 2026 CECOS University. All rights reserved.',
    ur: '© 2026 CECOS یونیورسٹی۔ جملہ حقوق محفوظ ہیں۔'
  },
  'footer.privacy': {
    en: 'Privacy',
    ur: 'پرائیویسی'
  },
  'footer.terms': {
    en: 'Terms',
    ur: 'شرائط'
  },
  'footer.apply': {
    en: 'Apply now',
    ur: 'ابھی درخواست دیں'
  },
  'footer.draft': {
    en: 'Log in to my draft',
    ur: 'میرے ڈرافٹ میں لاگ ان'
  },
  'wa.label': {
    en: 'Need help? Chat with us',
    ur: 'مدد چاہیے؟ چیٹ کریں'
  },

  // ─── Fee Structure ──────────────────────────────────────────────────────────
  'fee.eyebrow': {
    en: 'Fee Structure',
    ur: 'فیس کا ڈھانچہ'
  },
  'fee.title': {
    en: 'Know exactly what you\'ll invest — no surprises.',
    ur: 'جانیں کہ آپ کی سرمایہ کاری کیا ہوگی — کوئی حیرانی نہیں۔'
  },
  'fee.sub': {
    en: 'Search or select your program to see the per-semester fee, duration, and estimated total cost.',
    ur: 'اپنا پروگرام تلاش کریں یا منتخب کریں — فی سمیسٹر فیس، دورانیہ، اور تخمینی کل لاگت دیکھیں۔'
  },
  'fee.search': {
    en: 'Search or select your program…',
    ur: 'اپنا پروگرام تلاش کریں…'
  },
  'fee.semester': {
    en: 'Per Semester',
    ur: 'فی سمیسٹر'
  },
  'fee.total': {
    en: 'Est. Total',
    ur: 'تخمینہ کل'
  },
  'fee.duration': {
    en: 'Duration',
    ur: 'دورانیہ'
  },
  'fee.semesters': {
    en: 'semesters',
    ur: 'سمیسٹرز'
  },
  'fee.includes': {
    en: 'Includes tuition, lab & library fees',
    ur: 'ٹیوشن، لیب اور لائبریری فیسیں شامل ہیں'
  },
  'fee.scholarship': {
    en: 'Eligible for up to 100% scholarship',
    ur: '100% تک وظیفے کے اہل'
  },
  'fee.group': {
    en: 'Group',
    ur: 'گروپ'
  },
  'fee.disclaimer': {
    en: 'Fees shown are per semester and subject to change. Lab, hostel, and transport charges may apply separately. Contact admissions for the most current schedule.',
    ur: 'فیسیں فی سمیسٹر ہیں اور تبدیل ہو سکتی ہیں۔ لیب، ہاسٹل اور ٹرانسپورٹ چارجز الگ سے لاگو ہو سکتے ہیں۔ تازہ ترین شیڈول کے لیے داخلہ دفتر سے رابطہ کریں۔'
  },
  'fee.cta': {
    en: 'Apply Now',
    ur: 'ابھی درخواست دیں'
  },
  'fee.download': {
    en: 'Download full fee sheet',
    ur: 'مکمل فیس شیٹ ڈاؤن لوڈ کریں'
  },
  'fee.noResults': {
    en: 'No programs match your search.',
    ur: 'آپ کی تلاش سے کوئی پروگرام نہیں ملا۔'
  }
};
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};
const LanguageContext = createContext<Ctx | null>(null);
export function LanguageProvider({ children }: { children: ReactNode; }) {
  const [lang, setLang] = useState<Lang>('en');
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);
  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key: string) => dict[key] ? dict[key][lang] : key,
      dir: lang === 'ur' ? 'rtl' : 'ltr'
    }),
    [lang]
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>);

}
export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx;
}