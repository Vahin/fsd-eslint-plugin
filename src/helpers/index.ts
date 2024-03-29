import path from 'path';

export const isPathRelative = (path:string) => {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

export const layers: Record<string, string> = {
  'pages': 'pages',
  'widjets': 'widjets',
  'features': 'features',
  'entities': 'entities',
  'shared': 'shared'
}

export const getNormilizedPath = (pathTo: string) => {
  const normilized = path.toNamespacedPath(pathTo);
  return normilized.split('src')[1]?.split('\\').join('/');
}

export const getRelativePath = (toFilename: string, importFrom: string) => {
  const normilizedPath = getNormilizedPath(toFilename)
    ?.split('/')
    .slice(1, -1)
    .join('/') || '';
  
  console.log('normilizedPath: ', normilizedPath)
  console.log('importFrom: ', importFrom)
  console.log('path.relative(normilizedPath, importFrom): ', )

  let relativePath = path.relative(normilizedPath, importFrom)
    .split('\\')
    .join('/');

  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  return relativePath;
}

export const shouldBeRelative = (from:string, to: string) => {
  if (isPathRelative(from)) {
    return false;
  }

  const fromArray = from.split("/");
  const fromLayer = fromArray[0];
  const fromSlice = fromArray[1];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false
  }

  const projectTo = getNormilizedPath(to);

  const toArray = projectTo?.split('/');
  const toLayer = toArray ? toArray[1] : '';
  const toSlice = toArray ? toArray[2] : '';

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false
  }


  return fromSlice === toSlice && fromLayer === toLayer;
}
