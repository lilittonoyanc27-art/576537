import { SubtitleItem, QuizQuestion } from './types';

export const YOUTUBE_VIDEO_ID = 'Hp7UGwSdBkA';
export const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=Hp7UGwSdBkA';

export const SUBTITLES_DATA: SubtitleItem[] = [
  {
    id: 1,
    startTime: 0,
    endTime: 6,
    timeFormatted: '0:00',
    spanish: 'Ella tenía éxito. Perdóneme, capitán.',
    armenian: 'Նա հաջողություն էր ունենում։ Ներեցե՛ք ինձ, կապիտա՛ն։',
    context: 'Disculpa formal ante el capitán.'
  },
  {
    id: 2,
    startTime: 6,
    endTime: 11,
    timeFormatted: '0:06',
    spanish: 'Una broma a sus expensas. Y espero que siga así.',
    armenian: 'Կատակ՝ Ձեր հաշվին։ Եվ հուսով եմ, որ այդպես էլ կշարունակվի։',
    context: 'Expresión «a sus expensas» = a costa de alguien.'
  },
  {
    id: 3,
    startTime: 11,
    endTime: 14,
    timeFormatted: '0:11',
    spanish: 'Don Rafael quiere que vuelva a la mesa ahora.',
    armenian: 'Դոն Ռաֆայելը ցանկանում է, որ Դուք հիմա վերադառնաք սեղանի մոտ։',
    context: 'Subjuntivo después de «quiere que...» (vuelva).'
  },
  {
    id: 4,
    startTime: 14,
    endTime: 64,
    timeFormatted: '0:14',
    spanish: 'Niño. ¿Algo más fuerte?',
    armenian: 'Տղա՛։ Ավելի թունդ որևէ բա՞ն։',
    context: 'Petición de bebida con mayor intensidad.'
  },
  {
    id: 5,
    startTime: 64,
    endTime: 66,
    timeFormatted: '1:04',
    spanish: '¿O se siente inadecuada para la tarea?',
    armenian: 'Թե՞ զգում եք, որ համապատասխան չեք այդ առաջադրանքի համար։',
    context: 'Verbo pronominal «sentirse» + adjetivo «inadecuada».'
  },
  {
    id: 6,
    startTime: 66,
    endTime: 68,
    timeFormatted: '1:06',
    spanish: 'No, al contrario, don Alejandro.',
    armenian: 'Ո՛չ, ընդհակառակը, դոն Ալեխանդրո։',
    context: 'Locución «al contrario» para negar enfáticamente.'
  },
  {
    id: 7,
    startTime: 68,
    endTime: 73,
    timeFormatted: '1:08',
    spanish: 'Solo pienso en su rechazo a la transpiración.',
    armenian: 'Ես պարզապես մտածում եմ քրտնելու նկատմամբ Ձեր բացասական վերաբերմունքի մասին։',
    context: 'Pensar en algo + sustantivos «rechazo» y «transpiración».'
  },
  {
    id: 8,
    startTime: 73,
    endTime: 124,
    timeFormatted: '1:13',
    spanish: '¿Maestro? Sí.',
    armenian: 'Վարպե՞տ։ Այո՛։',
    context: 'Intercambio breve de respeto entre discípulo y tutor.'
  },
  {
    id: 9,
    startTime: 124,
    endTime: 160,
    timeFormatted: '2:04',
    spanish: 'Interesante. Te lo aseguro.',
    armenian: 'Հետաքրքիր է։ Հավատացնում եմ քեզ։',
    context: 'Afirmación de certeza con pronombres de OD y OI.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Qué significa «Perdóneme»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Perdóneme»։',
    options: [
      { id: 'A', text: 'Ներեցե՛ք ինձ։', translation: 'Perdóneme / Discúlpeme' },
      { id: 'B', text: 'Սպասե՛ք ինձ։', translation: 'Espéreme' },
      { id: 'C', text: 'Օգնե՛ք ինձ։', translation: 'Ayúdeme' },
      { id: 'D', text: 'Լսե՛ք ինձ։', translation: 'Escúcheme' }
    ],
    correctOptionId: 'A',
    explanationEs: '«Perdóneme» es una forma formal de cortesía (usted) del verbo «perdonar» usada para pedir disculpas.',
    explanationHy: '«Perdóneme»-ն «perdonar» (ներել) բայի քաղաքավարի ձևն է (Դուք)՝ ներողություն խնդրելու համար։',
    relatedTimestamp: 0
  },
  {
    id: 2,
    question: '¿Qué significa «Una broma»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Una broma»։',
    options: [
      { id: 'A', text: 'Մի պատմություն', translation: 'Una historia / cuento' },
      { id: 'B', text: 'Մի կատակ', translation: 'Una broma / chiste' },
      { id: 'C', text: 'Մի հարց', translation: 'Una pregunta' },
      { id: 'D', text: 'Մի գաղտնիք', translation: 'Un secreto' }
    ],
    correctOptionId: 'B',
    explanationEs: '«Una broma» significa una burla o chiste con fin humorístico. En la escena dicen «a sus expensas».',
    explanationHy: '«Una broma» նշանակում է կատակ կամ զվարճախոսություն։',
    relatedTimestamp: 6
  },
  {
    id: 3,
    question: '¿Quién quiere que alguien vuelva a la mesa?',
    questionArmenian: 'Ո՞վ է ցանկանում, որ ինչ-որ մեկը վերադառնա սեղանի մոտ:',
    options: [
      { id: 'A', text: 'Don Alejandro', translation: 'Դոն Ալեխանդրոն' },
      { id: 'B', text: 'El capitán', translation: 'Կապիտանը' },
      { id: 'C', text: 'Don Rafael', translation: 'Դոն Ռաֆայելը' },
      { id: 'D', text: 'El maestro', translation: 'Վարպետը' }
    ],
    correctOptionId: 'C',
    explanationEs: 'En el diálogo se dice textualmente: «Don Rafael quiere que vuelva a la mesa ahora».',
    explanationHy: 'Տեսարանում հստակ ասվում է. «Don Rafael quiere que vuelva a la mesa ahora» (Դոն Ռաֆայելն է ուզում)։',
    relatedTimestamp: 11
  },
  {
    id: 4,
    question: '¿Qué significa «Vuelva a la mesa»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Vuelva a la mesa»։',
    options: [
      { id: 'A', text: 'Դուրս եկեք տնից։', translation: 'Salga de la casa' },
      { id: 'B', text: 'Վերադարձեք սեղանի մոտ։', translation: 'Regrese a la mesa' },
      { id: 'C', text: 'Բացեք դուռը։', translation: 'Abra la puerta' },
      { id: 'D', text: 'Նստեք մեքենան։', translation: 'Suba al coche' }
    ],
    correctOptionId: 'B',
    explanationEs: '«Vuelva» es el imperativo formal del verbo «volver» (regresar), y «a la mesa» es el destino.',
    explanationHy: '«Vuelva»-ն «volver» (վերադառնալ) բայի քաղաքավարի հրամայականն է, իսկ «a la mesa»՝ դեպի սեղանը։',
    relatedTimestamp: 11
  },
  {
    id: 5,
    question: '¿Qué significa «Algo más fuerte»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Algo más fuerte»։',
    options: [
      { id: 'A', text: 'Ավելի թունդ մի բան', translation: 'Algo con mayor graduación/fuerza' },
      { id: 'B', text: 'Ավելի սառը մի բան', translation: 'Algo más frío' },
      { id: 'C', text: 'Ավելի փոքր մի բան', translation: 'Algo más pequeño' },
      { id: 'D', text: 'Ավելի քաղցր մի բան', translation: 'Algo más dulce' }
    ],
    correctOptionId: 'A',
    explanationEs: 'Se refiere a pedir una bebida con mayor graduación alcohólica o intensidad de sabor.',
    explanationHy: 'Վերաբերում է ավելի թունդ խմիչք պատվիրելուն («fuerte» = ուժեղ, թունդ)։',
    relatedTimestamp: 14
  },
  {
    id: 6,
    question: '¿Qué significa «Al contrario»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Al contrario»։',
    options: [
      { id: 'A', text: 'Երբեմն', translation: 'A veces' },
      { id: 'B', text: 'Հակառակը', translation: 'Al revés / por el contrario' },
      { id: 'C', text: 'Հետագայում', translation: 'En el futuro / después' },
      { id: 'D', text: 'Իհարկե', translation: 'Por supuesto' }
    ],
    correctOptionId: 'B',
    explanationEs: '«Al contrario» es una locución común que indica oposición o contradicción con lo dicho.',
    explanationHy: '«Al contrario» նշանակում է «ընդհակառակը, հակառակը»։',
    relatedTimestamp: 66
  },
  {
    id: 7,
    question: '¿Qué verbo aparece en «Se siente inadecuada»?',
    questionArmenian: 'Ո՞ր բայն է հանդիպում «Se siente inadecuada» արտահայտության մեջ:',
    options: [
      { id: 'A', text: 'Sentirse', translation: 'Իրեն զգալ' },
      { id: 'B', text: 'Sentarse', translation: 'Նստել' },
      { id: 'C', text: 'Saber', translation: 'Իմանալ' },
      { id: 'D', text: 'Salir', translation: 'Դուրս գալ' }
    ],
    correctOptionId: 'A',
    explanationEs: 'El verbo es «sentirse» (sentir + se), indicando el estado o percepción personal: ella se siente.',
    explanationHy: 'Բայն է «sentirse» (իրեն զգալ): «Sentarse» նշանակում է նստել։',
    relatedTimestamp: 64
  },
  {
    id: 8,
    question: '¿Qué significa «Solo pienso»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Solo pienso»։',
    options: [
      { id: 'A', text: 'Ես միայն լսում եմ։', translation: 'Solo escucho' },
      { id: 'B', text: 'Ես միայն տեսնում եմ։', translation: 'Solo veo' },
      { id: 'C', text: 'Ես միայն մտածում եմ։', translation: 'Solo pienso' },
      { id: 'D', text: 'Ես միայն սպասում եմ։', translation: 'Solo espero' }
    ],
    correctOptionId: 'C',
    explanationEs: '«Solo» equivale a solamente/únicamente, y «pienso» es la 1ª persona del verbo pensar (yo pienso).',
    explanationHy: '«Solo» = միայն, «pienso» = մտածում եմ («pensar» բայից)։',
    relatedTimestamp: 68
  },
  {
    id: 9,
    question: '¿Qué significa «Rechazo»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Rechazo»։',
    options: [
      { id: 'A', text: 'Ընդունում', translation: 'Aceptación' },
      { id: 'B', text: 'Մերժում', translation: 'Rechazo / repudio' },
      { id: 'C', text: 'Հրավեր', translation: 'Invitación' },
      { id: 'D', text: 'Շնորհավորանք', translation: 'Felicitación' }
    ],
    correctOptionId: 'B',
    explanationEs: '«Rechazo» es la negación, aversión o acción de no admitir algo (del verbo rechazar).',
    explanationHy: '«Rechazo» նշանակում է մերժում, հրաժարում կամ խորշում։',
    relatedTimestamp: 68
  },
  {
    id: 10,
    question: '¿Qué significa «Transpiración»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Transpiración»։',
    options: [
      { id: 'A', text: 'Շնչառություն', translation: 'Respiración' },
      { id: 'B', text: 'Քրտնարտադրություն', translation: 'Transpiración / sudor' },
      { id: 'C', text: 'Հանգիստ', translation: 'Descanso' },
      { id: 'D', text: 'Շարժում', translation: 'Movimiento' }
    ],
    correctOptionId: 'B',
    explanationEs: '«Transpiración» es el sudor o secreción corporal a través de la piel por esfuerzo o calor.',
    explanationHy: '«Transpiración» նշանակում է քրտնարտադրություն, քրտինք։',
    relatedTimestamp: 68
  },
  {
    id: 11,
    question: '¿Qué significa «Te lo aseguro»?',
    questionArmenian: 'Ի՞նչ է նշանակում «Te lo aseguro»։',
    options: [
      { id: 'A', text: 'Ես քեզ հրավիրում եմ։', translation: 'Te invito' },
      { id: 'B', text: 'Ես քեզ հավատացնում եմ։', translation: 'Te lo aseguro / te doy certeza' },
      { id: 'C', text: 'Ես քեզ սպասում եմ։', translation: 'Te espero' },
      { id: 'D', text: 'Ես քեզ խնդրում եմ։', translation: 'Te lo pido' }
    ],
    correctOptionId: 'B',
    explanationEs: '«Asegurar» significa dar seguridad o certeza; «te lo aseguro» transmite total certidumbre.',
    explanationHy: '«Asegurar» նշանակում է հավաստիացնել, երաշխավորել։ «Te lo aseguro» = հավատացնում եմ քեզ։',
    relatedTimestamp: 124
  },
  {
    id: 12,
    question: '¿Qué tiempo verbal aparece en «Ella tenía éxito»?',
    questionArmenian: 'Ո՞ր բայաժամանակն է առկա «Ella tenía éxito» արտահայտության մեջ:',
    options: [
      { id: 'A', text: 'Presente', translation: 'Ներկա ժամանակ (tiene)' },
      { id: 'B', text: 'Futuro simple', translation: 'Ապառնի ժամանակ (tendrá)' },
      { id: 'C', text: 'Pretérito imperfecto', translation: 'Անցյալ անկատար ժամանակ (tenía)' },
      { id: 'D', text: 'Pretérito perfecto', translation: 'Անցյալ կատարյալ ժամանակ (tuvo / ha tenido)' }
    ],
    correctOptionId: 'C',
    explanationEs: '«Tenía» es la 3ª persona del singular del pretérito imperfecto de indicativo del verbo «tener».',
    explanationHy: '«Tenía»-ն «tener» բայի Pretérito imperfecto (անցյալ անկատար) ձևն է։',
    relatedTimestamp: 0
  }
];
