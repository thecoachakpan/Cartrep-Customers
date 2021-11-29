
export const locations = {
  areas:['Nwaniba Road','Oron Road','Abak Road','Aka Road','Ikot Ekpene Road','Ewet housing estate','Osongoma estate','Ewet Housing extension','Shelter Afrik Estate','Atiku','IBB','Two lanes','Itu road','Udo ette street'],

  landmarks:{

    'Nwaniba Road':['Lucky filling station', 'Uniuyo Perm. Site', 'Use Primary School', 'Ekpri-Nsukara', 'Anua', 'Four lanes', 'Sylvanus Okon', 'Osongoma', 'Uruan Street', 'Power City', 'Vitafoam (Round-about)'],

    'Oron Road':['Vitafoam (Round-about)', 'Udotung obo', 'Killimanjaro (Oron Rd)', 'May Flower', 'Two lanes – Four lanes', 'Udo Udoma traffic light', 'Timber Junction', 'Shelter Junction', 'After Shelter (U-turn)'],

    'Abak Road':['Udi street', 'GT bank', 'Longrich office', 'Pepperoni', 'Nkemba street', 'Esuene street', 'Tantalizers', 'Mechanic village', 'Federal Secretariat', 'Teaching Hospital', 'Nepa line'],

    'Aka Road':['Access Diamond bank', 'Kevin lane', 'Nepa line', 'Aka Junction', 'Crunchies', 'Udo Udoma', 'Aka-etinan', 'Ring road', 'Champions brewery', 'Ukanafon street'],

    'Ikot Ekpene Road':['Uniuyo main gate', 'Mummy J', 'Ibiam street', 'Killimanjaro (IK Rd)', 'Ikot Idoro', 'Itam Market', 'NNPC', 'Wellington Bassey', 'Itam park (AKTC)'],

  },

  farPairs:{

    'Lucky filling station':['After Shelter (U-turn)', 'Federal Secretariat', 'Teaching Hospital', 'Ring road', 'Champions brewery', 'Itam Market', 'NNPC', 'Itam park (AKTC)', 'Itu road', 'Udo ette street'],

    'After Shelter (U-turn)':['Itam Market', 'NNPC', 'Itam park (AKTC)', 'Itu road', 'Udo ette street', 'Lucky filling station', 'Federal Secretariat', 'Teaching Hospital', 'Mechanic village', 'Champions brewery'],

    'Champions brewery':['Lucky filling station', 'After Shelter (U-turn)', 'Federal Secretariat', 'Teaching Hospital', 'Mechanic village', 'Itam Market', 'NNPC', 'Itam park (AKTC)', 'Itu road', 'Udo ette street'],

    groupedPairs:[
      {from:['Federal Secretariat','Teaching Hospital','Mechanic village'],to:['Lucky filling station', 'After Shelter (U-turn)', 'Champions brewery', 'Itam Market', 'NNPC', 'Itam park (AKTC)', 'Itu road', 'Udo ette street']},
      {from:['Itam Market','NNPC','Itam park (AKTC)','Itu road','Udo ette street'],to:['Lucky filling station', 'After Shelter (U-turn)', 'Federal Secretariat', 'Teaching Hospital', 'Mechanic village', 'Champions brewery']}
    ],
  }
}
