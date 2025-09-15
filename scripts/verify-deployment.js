#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Verifies that Avenue Muyenga properties are accessible after deployment
 * This script should be run after each deployment to ensure the fix worked
 */

import https from 'https';
import http from 'http';

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function verifyDeployment(baseUrl) {
  console.log(`🔍 Verifying deployment at: ${baseUrl}`);
  
  try {
    // Test 1: Check version endpoint
    console.log('\n1. Testing version endpoint...');
    const version = await fetchJson(`${baseUrl}/__version`);
    console.log(`   ✅ Version: ${version.version}`);
    console.log(`   ✅ Build Time: ${version.buildTime}`);
    console.log(`   ✅ Storage: ${version.storage}`);
    
    // Test 2: Check properties API
    console.log('\n2. Testing properties API...');
    const properties = await fetchJson(`${baseUrl}/api/properties`);
    console.log(`   📊 Total properties found: ${properties.length}`);
    
    // Test 3: Check for Avenue Muyenga properties
    console.log('\n3. Checking for Avenue Muyenga properties...');
    const avenueMuyengaProps = properties.filter(p => 
      p.title && p.title.includes('Avenue Muyenga')
    );
    
    console.log(`   🏘️  Avenue Muyenga properties found: ${avenueMuyengaProps.length}`);
    
    if (avenueMuyengaProps.length === 0) {
      console.log('   ❌ FAILED: No Avenue Muyenga properties found!');
      console.log('   🔧 This indicates the deployment didn\'t update properly.');
      process.exit(1);
    }
    
    // Show found properties
    avenueMuyengaProps.forEach((prop, index) => {
      console.log(`   ${index + 1}. ${prop.title} (${prop.bedrooms} bedrooms)`);
    });
    
    // Test 4: Verify expected count (should be 3: 1BHK, 2BHK, 3BHK)
    if (avenueMuyengaProps.length !== 3) {
      console.log(`   ⚠️  WARNING: Expected 3 Avenue Muyenga properties, found ${avenueMuyengaProps.length}`);
    } else {
      console.log('   ✅ All 3 Avenue Muyenga properties confirmed!');
    }
    
    console.log('\n🎉 Deployment verification PASSED!');
    console.log('✅ The Avenue Muyenga properties are properly deployed and accessible.');
    
  } catch (error) {
    console.log(`\n❌ Deployment verification FAILED: ${error.message}`);
    console.log('🔧 This indicates a deployment or server issue.');
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);
const baseUrl = args[0] || 'https://shinebebright.com';

verifyDeployment(baseUrl).catch((error) => {
  console.error('💥 Verification script failed:', error);
  process.exit(1);
});