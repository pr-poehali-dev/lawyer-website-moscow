import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import CookieBanner from '@/components/CookieBanner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [consents, setConsents] = useState({
    personalData: false,
    confidentiality: false
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [stats, setStats] = useState({ years: 0, won: 0, dismissed: 0, confidentiality: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
            if (entry.target.id === 'stats' && !statsAnimated) {
              setStatsAnimated(true);
              animateStats();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [statsAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const targets = { years: 20, won: 500, dismissed: 200, confidentiality: 100 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        years: Math.floor(targets.years * progress),
        won: Math.floor(targets.won * progress),
        dismissed: Math.floor(targets.dismissed * progress),
        confidentiality: Math.floor(targets.confidentiality * progress)
      });
      if (step >= steps) {
        setStats(targets);
        clearInterval(timer);
      }
    }, interval);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: 'Scale',
      title: 'Уголовная защита',
      description: 'Защита по делам о кражах, наркотиках, налоговых преступлениях. Прекращение дел, УДО, изменение меры пресечения.'
    },
    {
      icon: 'Building2',
      title: 'Арбитражные споры',
      description: 'Взыскание долгов, споры по договорам поставки. Представительство в арбитражных судах всех инстанций.'
    },
    {
      icon: 'FileText',
      title: 'Юридическое сопровождение',
      description: 'Комплексное правовое обслуживание бизнеса, консультации по налогообложению и регулированию.'
    },
    {
      icon: 'Users',
      title: 'Гражданские дела',
      description: 'Семейное и трудовое право, споры по интеллектуальной собственности, защита прав потребителей.'
    }
  ];

  const testimonials = [
    {
      name: 'Алина',
      text: 'Хочу выразить благодарность Алексею Геннадьевичу! Обратилась к нему по трудовому спору, так как бывший работодатель после увольнения не выплатил мне заработную плату. Я обращалась к многим юристам за консультацией, но все общение с ними сводилось чтоб "развести" на консультацию, а дельных советов или решения моего вопроса так от них и не услышала. Алексей Геннадьевич четко определил суть вопроса и путь решения. Написал в надзорные органы несколько жалоб, работодатель все выплатил, сам и без суда!!! Рекомендую этого адвоката как профессионала.'
    },
    {
      name: 'Анна',
      text: 'Обращалась к этому адвокату по вопросу защиты моего брата по уголовному делу. Брат обвинялся в грабеже, хищении мобильного телефона. Изначально на следствии брату был предоставлен государственный адвокат по назначению. Я уверена, что если бы этот адвокат остался в деле до конца, то брата бы точно посадили. Профессиональная работа Алексея Геннадьевича на стадии предварительного следствия, путем защиты брата на допросах и активном участии в очных ставках позволило переквалифицировать преступление в другую категорию тяжести на ч. 1 ст. 158 УК РФ. В дальнейшем в суде по ходатайству Алексея Геннадьевича дело было вовсе прекращено, и мы отделались только штрафом! Я очень благодарна что судьба свела меня именно с этим адвокатом. Теперь всем друзьям и знакомым советую его по любым вопросам.'
    },
    {
      name: 'Валентина Андреевна',
      text: 'Попала на консультацию к Алексею Геннадьевичу по рекомендации знакомого. Я врач высшей категории. Работала в государственном учреждении и являлась членом врачебной комиссии. Так случилось, что по причине чужой халатности на меня решили повесить материальные убытки которые понес пациент проходивший комиссию (судебные медицинские заключения, транспортные расходы, расходы на юристов), суммы были заоблачные. При этом я была ни в чем не виновата, так как решал в итоге председатель комиссии. Работодатель решил взыскать эти расходы с меня в судебном порядке. Итог, все дисциплинарные взыскания в отношении меня суд признал незаконными и полностью отказал в удовлетворении исковых требований с меня. Все расходы мои на адвоката повесили на работодателя, я очень довольна результатом. Спасибо за профессиональный подход.'
    },
    {
      name: 'Наталья',
      text: 'Мой несовершеннолетний сын был задержан, при нем были обнаружены наркотики. По рекомендации друга обратилась к адвокату Мушовец Алексею Геннадьевичу. Я очень ему благодарна за незамедлительную реакцию на эти события. Он успел прибыть в полицию до первого допроса сына, в котором должен был участвовать бесплатный адвокат, предоставленный полицией. Изначально следователь хотел вменить ему статью за сбыт, но после допроса следователь принял решение возбудить дело по ч. 1 ст. 228 УК. Правильная защита сына на допроса и очной ставке спасла ему судьбу. В итоге дело было прекращено в суде, отделались только штрафом, а сын поступил в институт и успешно учится. Спасибо огромное!'
    },
    {
      name: 'Аноним',
      text: 'Я могу сказать об этом адвокате, что он не из самых дешевых адвокатов, но за успех и профессиональный подход надо платить достойно. В результате грамотной работе в суде, удалось признать сделку купли-продажи квартиры в Москве недействительной. В итоге вернула свою квартиру обратно в собственность, а мошенники были привлечены к уголовной ответственности и получили по заслугам. Рекомендую обращаться.'
    },
    {
      name: 'Мария',
      text: 'Обвинялась в незаконной банковской деятельности (обнал), прокурор грозил посадить на 5 лет. Адвокат Алексей Геннадьевич выбрал единственно верный способ защиты на предварительном следствии и в суде. В итоге получила 2 года условно.'
    },
    {
      name: 'Эгамберди',
      text: 'Являюсь гражданином Киргизии. Обвинялся в совершении грабежа, был задержан и отправлен под стражу. Готовился, что посадят минимум на 3 года. Алексея Геннадьевича нанял для меня мой брат. После вступления в дело он ознакомился с уголовным делом и увидел в документах фальсификацию со стороны следственных органов. Я не знаю всех подробностей как у него получилось, но через два месяца после возбуждения уголовного дела и нахождении меня в СИЗО, уголовное дело было переквалифицировано кражу в категорию средней тяжести. В суде по ходатайству следователя дело было прекращено, дали судебный штраф 20 тр. Очень благодарен адвокату.'
    },
    {
      name: 'Александр',
      text: 'Очень грамотно проконсультировал и написал нужный документ. Обошли без дорогостоящих судов.'
    },
    {
      name: 'Михаил',
      text: 'Покупал готовый бизнес, необходимо было проверить и оценить все риски оформления прав. Порекомендовали Алексея Геннадьевича. В итоге отказался от покупки, так как были юридические проблемы и ограничения по недвижимости. Очень благодарен адвокату, можно сказать спас от разорения. В дальнейшем по итогам юридической проверки адвокатом Алексеем Геннадьевичем приобрел другое, без каких либо проблем. Рекомендую.'
    },
    {
      name: 'Владимир',
      text: 'Выражаем огромную благодарность Адвокату Мушовец Алексею Геннадьевичу, за участие в апелляции по гражданскому делу в Московском городском суде. Благодарим за проявленный профессионализм и учет всех наших пожеланий, правильно выбранной стратегии. Апелляционное решение было вынесено в нашу пользу! В первой инстанции другие юристы проиграли дело.'
    },
    {
      name: 'Дмитрий Валентинович',
      text: 'Кому необходима качественная защита как на предварительном следствии так и в суде рекомендую адвоката Мушовец Алексея. Если есть хоть какой либо шанс улучшить положение доверителя, он обязательно им воспользуется и выберет единственный верный способ защиты за вполне вменяемые деньги, проверено.'
    },
    {
      name: 'Наталья Владимировна',
      text: 'Обращалась по рекомендации знакомых по гражданскому делу, взыскивала долг по договору займа. Решение суда первой инстанции устояло в апелляционной инстанции. В последствии помог с успешным исполнением решения у приставов. Благодарю за профессиональный подход и не стандартное решение вопросов.'
    }
  ];

  const faqs = [
    {
      question: 'Моего брата обвиняют в совершении кражи по ч. 1 ст. 158 УК РФ. Подскажите, можно ли как-нибудь дело прекратить?',
      answer: 'Часть первая статьи 158 УК РФ устанавливает ответственность за преступления небольшой тяжести. Таким образом, освобождение от уголовной ответственности за кражу возможно при наличии ряда условий.\n\nСтатьей 76 УК РФ предусмотрено, что лицо привлекаемое к уголовной ответственности может быть освобождено от привлечения к уголовной ответственности в связи с примирением с пострадавшей стороной, когда вред заглажен потерпевшему. Для этого должны быть одновременно соблюдены несколько условий:\n• виновный совершил преступление впервые;\n• деяние подпадает под небольшую или среднюю тяжесть;\n• вред, нанесенный правонарушителем потерпевшему, должен быть полностью возмещен.\n\nС 15 июля 2016 года суды и следственные органы стали применять новое основание прекращения дела — назначение судебного штрафа. Сам следователь (дознаватель) может возбудить перед судом соответствующее ходатайство. Во всех случаях, каждое уголовное дело индивидуально и требует тщательного изучения адвокатом.'
    },
    {
      question: 'Мой сын был задержан по обвинению в совершении преступления ч.3 ст. 228.1 УК РФ. Можно ли что-нибудь сделать, чтобы его оставили хотя бы под домашним арестом?',
      answer: 'Не всегда тяжесть квалификации преступления является основанием для избрания меры пресечения в виде заключения под стражу. В Вашей ситуации, нужно действовать очень быстро, так как срок времени его задержания ограничен 48 часами, а следователь уже занят подготовкой документов для суда.\n\nНа этом этапе адвокату нужно действовать также оперативно. Необходимо ознакомиться с процессуальными документами составленными следователем с участием Вашего сына, возможно там есть существенные ошибки или иные недостатки, опечатки (затирки). Необходимо собрать материал по личности подозреваемого или обвиняемого (документы подтверждающие фактическое место жительства, образование, документы с места работы, характеристики, документы по состоянию здоровья его и близких родственником, лиц состоящих на иждивении и т.д.).\n\nРезультатом такой подготовки адвоката может являться отказ в удовлетворении ходатайства следователя об избрании в отношении подозреваемого или обвиняемого меры пресечения в виде заключения под стражу и мера пресечения может быть ограничена например домашним арестом или подпиской о невыезде и надлежащем поведении. Примеров в моей практике изменения меры пресечения на не связанную с изоляцией от общества масса. Главное не терять время, а обратиться к профессиональному защитнику.'
    },
    {
      question: 'Мой отец был осужден за грабеж (ч. 2 ст. 161 УК РФ) сроком на 3 года общего режима. Скажите имеет ли он право на УДО и какой порядок?',
      answer: 'Право и успешная реализация условно-досрочного освобождения осужденного зависит от множества факторов и обстоятельств. Преступление грабеж квалифицируемое по части 2 ст. 161 УК РФ относится к категории тяжких преступлений. У Вашего отца право на УДО возникнет по отбытии им наказания не менее половины срока.\n\nВажные условия для положительного решения об УДО увеличивающие шансы, является принятие всех мер по возмещению причинного ущерба потерпевшему. Все чаще суды при рассмотрении ходатайств осужденных на освобождение по УДО вызывают в судебное заседание самих потерпевших и выясняют у них отношение к рассматриваемому ходатайству, принятия мер к возмещению и заглаживанию осужденными причиненного ущерба.\n\nТакже обязательно необходимо заручиться положительными характеристиками от администрации исправительного учреждения. Это также весьма важный момент, поскольку, суд всегда обращает внимание на то, как вел себя осужденный в течение отбытого срока, сколько у него поощрений и наказаний, за какие провинности он привлекался администрацией колонии к мерам дисциплинарного взыскания.\n\nАдвокату на этапе подготовки необходимо сосредоточиться на сборе и анализе таких документов, а при необходимости принять меры к отмене дисциплинарных взысканий у осужденного. Успех в таких мероприятиях зачастую зависит от работы адвоката.'
    },
    {
      question: 'Моему сыну 14 лет. Его избили и отобрали телефон. С чего начать, куда жаловаться?',
      answer: 'Для начала необходимо незамедлительно обратиться в полицию и написать соответствующее заявление. В заявлении подробно изложить обстоятельства хищения, нанесения травм. В этом случае медицинская экспертиза будет проведена по направлению сотрудников полиции в рамках доследственной проверки. Экспертиза установит степень и характер травм, зафиксирует наличие такого факта.\n\nДалее следователь (дознаватель) будет решать вопрос исходя из обстоятельств дела и степени полученных травм о возбуждении уголовного дела. Как правило описываемые Вами события можно квалифицировать по ст. 161 УК РФ (грабеж) или 162 УК РФ (разбой). За это преступление предусмотрены достаточно суровые реальные наказания, связанные с лишением свободы.\n\nВернуть свое имущество или денежную компенсацию за него, а также компенсацию морального вреда причиненного преступлением, Вы сможете путем заявления гражданского иска к лицам совершившим преступление в отношении Вас. Рекомендую доверить представление Ваших интересов по этому делу адвокату.'
    },
    {
      question: 'Мой сын задержан с наркотическим веществом (гашиш) для личного потребления по ч.1 ст. 228 УК РФ. Можно ли прекратить уголовное дело?',
      answer: 'Статью 228 УК РФ часто называют "народная" статья и как правило является следствием стечения обстоятельств. Часть 1 ст. 228 УК РФ относится к категории преступлений средней тяжести, наказание за которое не превышает пяти лет лишения свободы. Размер наказания варьируется от штрафа до реального лишения свободы сроком на три года.\n\nСогласно ст. 76.2. УК РФ Лицо, впервые совершившее преступление небольшой или средней тяжести, может быть освобождено судом от уголовной ответственности с назначением судебного штрафа в случае, если оно возместило ущерб или иным образом загладило причиненный преступлением вред.\n\nВ Вашем случае, необходимо предпринять действия направленные к благоприятным факторам удовлетворения ходатайства о прекращении уголовного дела. Собрать справки об учебе, полученном образовании, положительные характеристики, с работы и учебы, а также по месту жительства, если есть награды, медали, дипломы предоставить следственным органам или в суд. Отсутствие судимости у Вашего сына является благоприятным фактором.\n\nДанное уголовное преступление направлено против здоровья населения и общественной нравственности. Связи с чем, конкретное потерпевшее лицо по таким статьям отсутствует и в данном случае потерпевшей стороной выступает в таких отношениях государство и общество. В целях возмещения ущерба и заглаживания вреда можно оказать благотворительную помощь в фонды помощи детям, детские дома например.\n\nПосле направления уголовного дела в суд необходимо заявить ходатайство о прекращении дела с применением меры уголовно-правового характера в виде судебного штрафа. Для успешной реализации вышеуказанных мероприятий вашему сыну потребуется адвокат.'
    },
    {
      question: 'Вы занимаетесь уголовными делами связанными с неуплатой налогов, обвиняют ч.2 ст. 199 УК РФ?',
      answer: 'Да, занимаюсь, есть положительная практика прекращения таких уголовных дел.'
    },
    {
      question: 'Необходимо обратиться с исковым заявлением в арбитражный суд. Есть должник юридическое лицо. Есть ли у Вас такой опыт?',
      answer: 'Участие в арбитражных процессах, один из основных направлений моей деятельности. Мной проведено множество успешных арбитражных процессов, в суде взысканы денежные средства в пользу доверителей на сотни миллионов рублей.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const validateName = (name: string): boolean => {
    if (name.trim().length < 2) {
      setFormErrors(prev => ({ ...prev, name: 'ФИО должно содержать минимум 2 символа' }));
      return false;
    }
    if (!/^[А-Яа-яЁёA-Za-z\s-]+$/.test(name)) {
      setFormErrors(prev => ({ ...prev, name: 'ФИО должно содержать только буквы' }));
      return false;
    }
    setFormErrors(prev => ({ ...prev, name: '' }));
    return true;
  };

  const formatPhoneInput = (value: string): string => {
    let cleaned = value.replace(/\D/g, '');
    if (!value.startsWith('+7')) {
      if (cleaned.startsWith('7')) {
        cleaned = cleaned.substring(1);
      } else if (cleaned.startsWith('8')) {
        cleaned = cleaned.substring(1);
      }
    }
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }
    return '+7' + cleaned;
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 11 || !cleaned.startsWith('7')) {
      setFormErrors(prev => ({ ...prev, phone: 'Введите корректный номер телефона в формате +7XXXXXXXXXX' }));
      return false;
    }
    setFormErrors(prev => ({ ...prev, phone: '' }));
    return true;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormErrors(prev => ({ ...prev, email: 'Введите корректный email адрес' }));
      return false;
    }
    setFormErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateName(formData.name);
    const isPhoneValid = validatePhone(formData.phone);
    const isEmailValid = validateEmail(formData.email);

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, исправьте ошибки в форме',
        variant: 'destructive'
      });
      return;
    }
    
    if (!consents.personalData || !consents.confidentiality) {
      toast({
        title: 'Ошибка',
        description: 'Необходимо согласие на обработку персональных данных и конфиденциальность',
        variant: 'destructive'
      });
      return;
    }
    
    const subject = encodeURIComponent(`Заявка от ${formData.name}`);
    const body = encodeURIComponent(
      `ФИО: ${formData.name}\n` +
      `Телефон: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `Вопрос:\n${formData.message}\n\n` +
      `---\n` +
      `Согласие на обработку персональных данных: Да\n` +
      `Согласие на конфиденциальность: Да`
    );
    
    window.location.href = `mailto:advokatmushovets@mail.ru?subject=${subject}&body=${body}`;
    
    toast({
      title: 'Успешно',
      description: 'Откроется ваш почтовый клиент для отправки заявки'
    });
    
    setFormData({ name: '', phone: '', email: '', message: '' });
    setConsents({ personalData: false, confidentiality: false });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Scale" className="text-accent" size={32} />
              <div>
                <h1 className="text-xl font-bold text-white">Адвокатский кабинет</h1>
                <p className="text-xs text-accent">Мушовец Алексей Геннадьевич</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-accent transition-colors">О практике</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-accent transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('faq')} className="text-white hover:text-accent transition-colors">Вопросы</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-white hover:text-accent transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className="text-white hover:text-accent transition-colors">Контакты</button>
            </div>
          </div>
        </div>
      </nav>

      <section 
        id="hero" 
        ref={(el) => (sectionRefs.current['hero'] = el)}
        className={`pt-32 pb-20 bg-gradient-to-b from-primary to-primary/90 transition-all duration-700 ${
          visibleSections.has('hero') ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent text-sm font-semibold tracking-wider mb-4">
                БОЛЕЕ 20 ЛЕТ ПРАКТИКИ
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Профессиональная<br />защита ваших прав
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Член Адвокатской палаты города Москвы. Специализация по уголовным и арбитражным делам в судах всех уровней.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg"
                onClick={() => scrollToSection('contacts')}
              >
                Получить консультацию
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent hover:text-primary font-semibold"
                onClick={() => scrollToSection('faq')}
              >
                Ответы на вопросы
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="stats"
        ref={(el) => (sectionRefs.current['stats'] = el)}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">{stats.years}+</div>
              <p className="text-muted-foreground">лет практики</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">{stats.won}+</div>
              <p className="text-muted-foreground">выигранных дел</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">{stats.dismissed}+</div>
              <p className="text-muted-foreground">прекращённых дел</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">{stats.confidentiality}%</div>
              <p className="text-muted-foreground">конфиденциальность</p>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="about" 
        ref={(el) => (sectionRefs.current['about'] = el)}
        className={`py-20 bg-muted transition-all duration-700 ${
          visibleSections.has('about') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О практике</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Юридическая практика более 20 лет гражданских, арбитражных и уголовных дел в судах всех уровней.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Успешная адвокатская практика специализации по уголовным делам, позволила защитить нарушенные права доверителей как на стадии предварительного расследования, так и в суде. Результатами успешного ведения уголовных дел являются прекращение уголовных преследований в отношении доверителей или благоприятная переквалификация преступлений, а также существенное снижение наказания.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Успешная многолетняя практика в области ведения гражданских и арбитражных дел позволила сохранить и приумножить имущество доверителей физических и юридических лиц, а также реально взыскать задолженности на сотни миллионов рублей.
              </p>
              <blockquote className="border-l-4 border-accent pl-6 italic text-xl text-foreground">
                "Мы найдем самый оптимальный путь разрешения любых, даже самых сложных и запутанных жизненных ситуаций."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="services" 
        ref={(el) => (sectionRefs.current['services'] = el)}
        className={`py-20 transition-all duration-700 ${
          visibleSections.has('services') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Направления практики</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Профессиональная защита в Москве, Московской области и по всем регионам России
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} className="text-accent" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="faq" 
        ref={(el) => (sectionRefs.current['faq'] = el)}
        className={`py-20 bg-muted transition-all duration-700 ${
          visibleSections.has('faq') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Вопросы и ответы</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Ответы адвоката на типовые вопросы клиентов
          </p>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white border-2 border-border rounded-lg px-6 data-[state=open]:border-accent"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-start gap-4 pr-4">
                      <span className="text-accent font-bold text-xl flex-shrink-0">Q{index + 1}</span>
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6">
                    <div className="flex items-start gap-4">
                      <span className="text-primary font-bold text-xl flex-shrink-0">A</span>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section 
        id="testimonials" 
        ref={(el) => (sectionRefs.current['testimonials'] = el)}
        className={`py-20 bg-white transition-all duration-700 ${
          visibleSections.has('testimonials') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Отзывы клиентов</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Реальные отзывы людей, которым я помог
          </p>
          <div className="max-w-5xl mx-auto relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="border-2 border-accent/30">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <Icon name="Quote" className="text-accent" size={32} />
                          <h3 className="font-bold text-2xl">{testimonial.name}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base">{testimonial.text}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-accent w-8' : 'bg-accent/30'
                  }`}
                  aria-label={`Перейти к отзыву ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-all shadow-lg"
              aria-label="Предыдущий отзыв"
            >
              <Icon name="ChevronLeft" className="text-primary" size={24} />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-all shadow-lg"
              aria-label="Следующий отзыв"
            >
              <Icon name="ChevronRight" className="text-primary" size={24} />
            </button>
          </div>
        </div>
      </section>

      <section 
        id="contacts" 
        ref={(el) => (sectionRefs.current['contacts'] = el)}
        className={`py-20 bg-gradient-to-b from-primary to-primary/90 transition-all duration-700 ${
          visibleSections.has('contacts') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Контакты</h2>
            <p className="text-xl text-gray-300 mb-12">
              Свяжитесь со мной для получения профессиональной юридической помощи
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-accent/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Телефон</h3>
                  <a href="tel:+79059768280" className="text-accent text-xl hover:text-accent/80 transition-colors">
                    +7 905-976-82-80
                  </a>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-accent/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a href="mailto:advokatmushovets@mail.ru" className="text-accent text-xl hover:text-accent/80 transition-colors break-all">
                    advokatmushovets@mail.ru
                  </a>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 mb-12">
              <Card className="bg-white/10 backdrop-blur-sm border-accent/20">
                <CardContent className="p-8">
                  <Icon name="MapPin" className="text-accent mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-bold text-white mb-2">Адвокат в Москве</h3>
                  <p className="text-gray-300">Член Адвокатской палаты города Москвы</p>
                  <p className="text-white font-semibold mt-4">Мушовец Алексей Геннадьевич</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Card className="bg-white border-2 border-accent/30">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-center mb-2">Связаться со мной</h3>
                  <p className="text-center text-muted-foreground mb-8">Заполните форму и я свяжусь с вами в ближайшее время</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold">ФИО *</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if (e.target.value.trim()) validateName(e.target.value);
                        }}
                        onBlur={(e) => validateName(e.target.value)}
                        placeholder="Иванов Иван Иванович"
                        required
                        className={`mt-2 ${formErrors.name ? 'border-destructive' : ''}`}
                      />
                      {formErrors.name && (
                        <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold">Номер телефона *</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhoneInput(e.target.value);
                          setFormData({...formData, phone: formatted});
                          if (formatted.length > 2) validatePhone(formatted);
                        }}
                        onFocus={(e) => {
                          if (!e.target.value) {
                            setFormData({...formData, phone: '+7'});
                          }
                        }}
                        onBlur={(e) => validatePhone(e.target.value)}
                        placeholder="+7 (900) 123-45-67"
                        required
                        className={`mt-2 ${formErrors.phone ? 'border-destructive' : ''}`}
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if (e.target.value.trim()) validateEmail(e.target.value);
                        }}
                        onBlur={(e) => validateEmail(e.target.value)}
                        placeholder="example@mail.ru"
                        required
                        className={`mt-2 ${formErrors.email ? 'border-destructive' : ''}`}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-base font-semibold">Опишите ваш вопрос *</Label>
                      <Textarea 
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Подробно опишите вашу ситуацию..."
                        required
                        rows={5}
                        className="mt-2"
                      />
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="personalData"
                          checked={consents.personalData}
                          onCheckedChange={(checked) => setConsents({...consents, personalData: checked as boolean})}
                          required
                        />
                        <Label htmlFor="personalData" className="text-sm leading-relaxed cursor-pointer">
                          Я согласен на обработку персональных данных в соответствии с{' '}
                          <Link to="/privacy" className="text-accent hover:underline" target="_blank">
                            политикой конфиденциальности
                          </Link>
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="confidentiality"
                          checked={consents.confidentiality}
                          onCheckedChange={(checked) => setConsents({...consents, confidentiality: checked as boolean})}
                          required
                        />
                        <Label htmlFor="confidentiality" className="text-sm leading-relaxed cursor-pointer">
                          Я подтверждаю, что вся предоставленная информация конфиденциальна и защищена{' '}
                          <Link to="/confidentiality" className="text-accent hover:underline" target="_blank">
                            адвокатской тайной
                          </Link>
                        </Label>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={!consents.personalData || !consents.confidentiality}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Отправить заявку
                      <Icon name="Send" className="ml-2" size={20} />
                    </Button>
                    {(!consents.personalData || !consents.confidentiality) && (
                      <p className="text-sm text-destructive text-center mt-2">
                        Для отправки заявки необходимо дать оба согласия
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary border-t border-accent/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Адвокатский кабинет Мушовец А.Г. Все права защищены.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Профессиональное кредо: «Адвокат — нанятая совесть». Ф.М. Достоевский
          </p>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a
          href="https://t.me/AdvokatMushovets"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#0088cc] hover:bg-[#006699] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
          aria-label="Написать в Telegram"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-white"
            fill="currentColor"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
        
        <a
          href="https://wa.me/79059768280"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
          aria-label="Написать в WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-white"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

      <CookieBanner />
    </div>
  );
};

export default Index;