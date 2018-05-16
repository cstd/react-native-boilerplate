
export function normalizeVersion(version) {
  return {
    required: version ? !!version.required : false,
    version: version ? version.version : '',
    build: version ? version.build : 0,
    link: version ? version.link : '',
  };
}

export function normalizeProfile(profile) {
  return {
    id: profile.id || '',
    username: profile.username || '',
    fullname: profile.fullname || '',
    email: profile.email || '',
    phone: profile.phone || '',
  };
}

export function normalizeProduct(product) {
  return {
    name: product.name || '',
  };
}

